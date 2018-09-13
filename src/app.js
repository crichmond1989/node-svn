import info from "./commands/info.js";
import log from "./commands/log.js";

export default class {
    constructor(options) {
        options = options || {};

        options.json = options.json === false ? false : true;
        options.source = options.source || ".";

        this.options = options;
    }

    info() {
        return new info(this.options).exec();
    }

    log() {
        return new log(this.options).exec();
    }
}