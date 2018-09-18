export default class LogResult {
    revision: number;
    author: string;
    date: Date;
    message: string;
    paths: string[];

    constructor(init?: Partial<LogResult>) {
        Object.assign(this, init);
    }
}