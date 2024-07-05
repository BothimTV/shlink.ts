export interface shortUrlListJson {
  readonly shortUrls: {
    readonly data: Array<shortUrlJson>;
    readonly pagination: {
      readonly currentPage: number;
      readonly pagesCount: number;
      readonly itemsPerPage: number;
      readonly itemsInCurrentPage: number;
      readonly totalItems: number;
    };
  };
}

export interface shortUrlJson {
  readonly shortCode: string;
  readonly shortUrl: string;
  longUrl: string;
  deviceLongUrls: {
    android: null | string;
    ios: null | string;
    desktop: null | string;
  };
  readonly dateCreated: string | Date;
  tags: Array<string>;
  meta: {
    validSince: null | string | Date;
    validUntil: null | string | Date;
    maxVisits: null | number;
  };
  domain: string;
  title: null | string;
  crawlable: boolean;
  forwardQuery: boolean;
  readonly visitsSummary: {
    total: number;
    nonBots: number;
    bots: number;
  };
  visitsCount: number;
}
