import moment from "moment";

import parseXml from "../parseXml.js";
import spawn from "../spawn";

export default class {
    constructor(options) {
        options = options || {};

        if (!options.source)
            throw new Error("source is required");

        if (options.revision && (options.start || options.end))
            throw new Error("must choose between revision or using start and/or end");

        this.options = options;
    }

    async exec() {
        const args = this.parseArgs();

        const result = await spawn("svn", args);

        if (this.options.json)
            return await this.transform(result);

        return result;
    }

    parseArgs() {
        const args = ["info"];

        if (this.options.json || this.options.xml)
            args.push("--xml");

        if (this.options.recursive)
            args.push("-R");

        if (this.options.revision)
            args.push(...["-r", this.options.revision.toString()]);

        args.push(this.options.source);

        return args;
    }

    async transform(xml) {
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
                date: moment(x.commit[0].date[0])
            }
        }));
    }
}