import info from "./commands/info.js";
import log from "./commands/log.js";

export default class {
    constructor(options) {
        options = options || {};

        options.format = options.format || "json";
        options.source = options.source || ".";

        this.options = options;
    }

    info(options) {
        return new info({ ...this.options, ...options }).exec();
    }

    log(options) {
        return new log({ ...this.options, ...options }).exec();
    }
}