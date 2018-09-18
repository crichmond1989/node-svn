import InfoOptions from "./infoOptions";

import parseXml from "../parseXml";
import spawn from "../spawn";

export default class {
    options: InfoOptions;

    constructor(options: InfoOptions) {
        options = options || new InfoOptions();

        if (!options.source)
            throw new Error("source is required");

        if (options.revision && (options.start || options.end))
            throw new Error("must choose between revision or using start and/or end");

        this.options = options;
    }

    async exec(): Promise<string | any> {
        const args = this.parseArgs();

        const result = await spawn("svn", args);

        if (this.options.format == "json")
            return await this.transform(result);

        return result;
    }

    parseArgs(): string[] {
        const args = ["info"];

        if (this.options.format == "json" || this.options.format == "xml")
            args.push("--xml");

        if (this.options.recursive)
            args.push("-R");

        if (this.options.revision)
            args.push(...["-r", this.options.revision.toString()]);

        args.push(this.options.source);

        return args;
    }

    async transform(xml: string): Promise<any[]> {
        const obj = await parseXml(xml);

        if (!obj.info.entry)
            return [];

        return obj.info.entry.map(x => ({
            revision: parseInt(x.$.revision, 10),
            kind: x.$.kind,
            path: x.$.path,
            url: x.url[0],
            relativeUrl: x["relative-url"][0],
            repository: {
                uuid: x.repository[0].uuid[0],
                root: x.repository[0].root[0]
            },
            commit: {
                revision: parseInt(x.commit[0].$.revision, 10),
                author: x.commit[0].author[0],
                date: new Date(x.commit[0].date[0])
            }
        }));
    }
}