export interface tagListJson {
    readonly shortUrls: {
        readonly data: Array<string> | Array<statsTagJson>;
        readonly pagination: {
            readonly currentPage: number;
            readonly pagesCount: number;
            readonly itemsPerPage: number;
            readonly itemsInCurrentPage: number;
            readonly totalItems: number;
        };
    };
}

export interface statsTagJson {
    tag: string
    readonly shortUrlsCount: number
    readonly visitsSummary: {
        readonly total: number,
        readonly nonBots: number,
        readonly bots: number
    }
}