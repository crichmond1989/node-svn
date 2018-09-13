import log from "./commands/log.js";

export default class {
    constructor(options) {
        options = options || {};

        options.source = options.source || ".";

        this.options = options;
    }

    log() {
        return new log({ source: this.options.source }).exec();
    }
}