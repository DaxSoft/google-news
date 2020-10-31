import { PathRoute } from '@vorlefan/path';
import {
    IGoogleNews_Structure,
    IGoogleNews_StructureChannel_Item,
} from './../@types/TypesJSONStructure';
import { IGoogleNews_BootstrapOptions } from './../@types/TypesGoogleNews';
import { Route } from '../path';
import { URL_GOOGLE_NEWS } from '../config/constants';
import parser from 'xml2json';
import { WaitSec } from '../utils/wait';

/*
:--------------------------------------------------------------------------
: Bootstrap
:--------------------------------------------------------------------------
*/

export class GoogleNews {
    _route: PathRoute;
    _searchs: string[];
    private _currentSearch?: string;
    _options: IGoogleNews_BootstrapOptions;
    private _url: string;
    private _xml: string;
    private _json?: IGoogleNews_Structure;
    private _filename: string;
    _news: IGoogleNews_Structure[];

    /**
     * @constructure
     */

    constructor(
        searchs: string[] | string,
        options?: IGoogleNews_BootstrapOptions
    ) {
        this._route = Route;
        this._searchs = Array.isArray(searchs) ? searchs : [searchs];
        this._options = Object.assign(
            {
                saveJson: true,
                saveXml: true,
                timeout: null,

                routeName: 'root',
                language: 'en-US',
                localization: 'US',
            },
            options || {}
        );
        this._url = '';
        this._xml = '';
        this._filename = '';
        this._news = [];

        if (
            !!this._options.route &&
            typeof this._options.route === 'function'
        ) {
            this._options.route(this._route);
        }
    }

    /**
     * @function run
     * @description recursive runs the crawler
     */

    async run() {
        if (this._searchs.length === 0) return null;
        this._currentSearch = this._searchs.shift();
        if (!this._currentSearch) return await this.run();
        if (
            !!this._options.timeout &&
            typeof this._options.timeout === 'number'
        ) {
            await WaitSec(this._options.timeout);
        }
        await this.crawler();
        return await this.run();
    }

    /**
     * @function news
     */

    news(): IGoogleNews_Structure[] {
        return this._news;
    }

    /**
     * @function news
     * @description get the news
     */

    async items(
        orderBy?: 'asc' | 'desc'
    ): Promise<IGoogleNews_StructureChannel_Item[][]> {
        const items: IGoogleNews_StructureChannel_Item[][] = this.news().map(
            (news) => news.rss.channel.item
        );
        if (!orderBy) return items;

        const orderedItems: IGoogleNews_StructureChannel_Item[][] = [];

        await Promise.allSettled(
            items.map(async (item) => {
                const news: IGoogleNews_StructureChannel_Item[] = item.sort(
                    (a, b) => {
                        const timeB = new Date(b.pubDate).getTime();
                        const timeA = new Date(a.pubDate).getTime();
                        return orderBy === 'desc'
                            ? timeB - timeA
                            : timeA - timeB;
                    }
                );
                orderedItems.push(news);
            })
        );

        return orderedItems;
    }

    /**
     * @function crawler
     */

    private async crawler(): Promise<Boolean> {
        if (!this._currentSearch) return false;
        try {
            this._url = URL_GOOGLE_NEWS(
                this._currentSearch,
                this._options.language || 'en-US',
                this._options.localization || 'US'
            );
            await this.dowload();
            await this.load();
            this.collect();
            await this.clean();
            await this.json();
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * @function json
     */

    private async json(): Promise<Boolean> {
        try {
            if (!!this._options.saveJson && this._options.saveJson === true) {
                await this._route
                    .json()
                    .set(this._options.routeName)
                    .store({
                        filename: this._filename.replace('.xml', '.json'),
                        data: this._json,
                        force: true,
                    });
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * @function clean
     */

    private async clean(): Promise<Boolean> {
        if (!this._json) return false;
        try {
            if (!this._options.saveXml) {
                await this._route.io().remove({
                    routeName: this._options.routeName,
                    filename: this._filename,
                });
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * @function collect
     */

    private collect() {
        if (!this._json) return;
        this._news.push(this._json);
    }

    /**
     * @function load
     */

    private async load() {
        const content = await this._route.io().read({
            routeName: this._options.routeName,
            filename: this._filename,
        });
        this._xml = String(content);
        const data = parser.toJson(this._xml, { object: true });
        this._json = data as IGoogleNews_Structure;
    }

    /**
     * @function download
     */

    private async dowload() {
        if (!this._currentSearch) return;

        const sanitizeSearch = this._currentSearch
            .toLocaleLowerCase()
            .replace(/\s/gm, '_');
        this._filename = `${sanitizeSearch}.${Date.now()}.xml`;

        const destination = this._route.plug(
            this._options.routeName,
            this._filename
        );

        await Route.stream().download({
            url: this._url,
            destination,
            protocol: 'https',
        });
    }
}
