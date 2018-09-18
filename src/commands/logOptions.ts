import AppOptions from "../appOptions";

export default class extends AppOptions {
    end?: Date;
    limit?: number;
    revision?: number;
    paths?: boolean;
    start?: Date;
    targets?: string[];
}