import DateFormatter from "../utils/dateFormatter";
import LogOptions from "./logOptions";
import LogResult from "./logResult";

import parseXml from "../utils/parseXml";
import spawn from "../utils/spawn";

export default class {
    options: LogOptions;

    constructor(options?: LogOptions) {
        options = options || new LogOptions();

        if (!options.source)
            throw new Error("source is required");

        if (options.revision && (options.start || options.end))
            throw new Error("must choose between revision or using start and/or end");

        this.options = options;
    }

    async exec(): Promise<string | LogResult[]> {
        const args = this.parseArgs();

        const result = await spawn("svn", args);

        if (this.options.format == "json")
            return await this.transform(result);

        return result;
    }

    parseArgs(): string[] {
        const args = ["log"];

        if (this.options.format == "json" || this.options.format == "xml")
            args.push("--xml");

        if (this.options.limit)
            args.push(...["-l", this.options.limit.toString()]);

        if (this.options.revision)
            args.push(...["-r", this.options.revision.toString()]);

        if (this.options.start || this.options.end) {
            args.push("-r");

            const formattedStart = this.options.start ? DateFormatter.toSvnFormat(this.options.start) : "1";
            const formattedEnd = this.options.end ? DateFormatter.toSvnFormat(this.options.end) : "HEAD";

            args.push(`${formattedStart}:${formattedEnd}`);
        }

        if (this.options.paths)
            args.push("-v");

        args.push(this.options.source);

        if (this.options.targets)
            args.push(...this.options.targets);

        return args;
    }

    async transform(xml: string): Promise<LogResult[]> {
        const obj = await parseXml(xml);

        if (!obj.log.logentry)
            return [];

        return obj.log.logentry.map(x => new LogResult({
            revision: parseInt(x.$.revision, 10),
            author: x.author[0],
            date: new Date(x.date[0]),
            message: x.msg[0],
            paths: x.paths && x.paths[0].path.map(y => y._)
        }));
    }
}