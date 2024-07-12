import { visitJson } from "../types/visits";

export class Visit implements visitJson {
    readonly referer: string | null;
    readonly date: Date;
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

    constructor(visitJson: visitJson) {
        this.referer = visitJson.referer;
        this.date = new Date(visitJson.date);
        this.userAgent = visitJson.userAgent;
        this.visitLocation = visitJson.visitLocation;
        this.potentialBot = visitJson.potentialBot;
        this.visitedUrl = visitJson.visitedUrl;
    }

}