import { PathRoute } from '@vorlefan/path';

export interface IGoogleNews_BootstrapOptions {
    saveXml?: boolean;
    saveJson?: boolean;
    timeout?: number | null;

    route?: (route: PathRoute) => void;
    routeName: string;
    language?: string;
    localization?: string;
}
