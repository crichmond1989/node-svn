import AppOptions from "./appOptions";
import Info from "./commands/info";
import InfoOptions from "./commands/infoOptions";
import Log from "./commands/log";
import LogOptions from "./commands/logOptions";

export default class {
    options: AppOptions;

    constructor(options: AppOptions) {
        options = options || new AppOptions();

        options.format = options.format || "json";
        options.source = options.source || ".";

        this.options = options;
    }

    info(options: InfoOptions): Promise<any> {
        return new Info({ ...this.options, ...options }).exec();
    }

    log(options: LogOptions): Promise<any> {
        return new Log({ ...this.options, ...options }).exec();
    }
}