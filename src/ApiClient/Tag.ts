import { statsTagJson } from "../types/tag";
import { Shlink } from "./Shlink";

let client: Shlink;
export class Tag {

    public tag: string
    public readonly shortUrlsCount?: number
    public readonly visitsSummary?: {
        readonly total: number,
        readonly nonBots: number,
        readonly bots: number
    }

    constructor(tag: string | statsTagJson, shClient: Shlink) {
        if (typeof tag == "string") {
            this.tag = tag
        } else {
            this.tag = tag.tag
            this.shortUrlsCount = tag.shortUrlsCount
            this.visitsSummary = tag.visitsSummary
        }
        client = shClient;
    }

    /**
     * Rename this tag
     */
    public async rename(newName: string): Promise<void> {
        await client.renameTag(this, newName)
        this.tag = newName
    }

    /**
     * Delete this tag
     */
    public async delete(): Promise<void> {
        await client.deleteTags([this])
    }

}