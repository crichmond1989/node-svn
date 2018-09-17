import { Moment } from "moment";

export default class LogResult {
    revision: number;
    author: string;
    date: Moment;
    message: string;
    paths: string[];

    constructor(init?: Partial<LogResult>) {
        Object.assign(this, init);
    }
}