export interface IGoogleNews_StructureChannel_Item {
    title: string;
    link: string;
    guid?: {
        isPermaLink: boolean;
        $t: string;
    };
    pubDate: string;
    description: string;
    source: {
        url: string;
        $t: string;
    };
}

export interface IGoogleNews_StructureChannel {
    generator: string;
    title: string;
    link: string;
    language: string;
    webMaster: string;
    copyright: string;
    lastBuildDate: string;
    description: string;
    item: IGoogleNews_StructureChannel_Item[];
}

export interface IGoogleNews_Structure {
    rss: {
        version: number;
        'xmlns:media': string;
        channel: IGoogleNews_StructureChannel;
    };
}
