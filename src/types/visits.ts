export interface totalVisitsJson {
    readonly visits: {
        readonly nonOrphanVisits: {
            readonly total: number;
            readonly nonBots: number;
            readonly bots: number;
        };
        readonly orphanVisits: {
            readonly total: number;
            readonly nonBots: number;
            readonly bots: number;
        };
    };
}

export interface visitListJson {
    readonly visits: {
        readonly data: visitJson[];
        readonly pagination: {
            readonly currentPage: number;
            readonly pagesCount: number;
            readonly itemsPerPage: number;
            readonly itemsInCurrentPage: number;
            readonly totalItems: number;
        };
    };
}

export interface visitJson {
    readonly referer: string | null;
    readonly date: string | Date;
    readonly userAgent: string;
    readonly visitLocation: {
        readonly cityName: string;
        readonly countryCode: string;
        readonly countryName: string;
        readonly latitude: number;
        readonly longitude: number;
        readonly regionName: string;
        readonly timezone: string;
    } | null;
    readonly potentialBot: boolean;
    readonly visitedUrl?: string;
}
