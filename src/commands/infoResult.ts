export default class InfoResult {
    revision: number;
    kind: string;
    path: string;
    url: string;
    relativeUrl: string;

    repository: {
        uuid: string;
        root: string;
    }

    commit: {
        revision: number;
        author: string;
        date: Date;
    }

    constructor(init?: Partial<InfoResult>) {
        Object.assign(this, init);
    }
}