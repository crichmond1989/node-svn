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

        const xml = await spawn("svn", args);

        return await this.transform(xml);
    }

    parseArgs() {
        const args = ["log", "--xml"];

        if (this.options.limit)
            args.push(...["-l", this.options.limit.toString()]);

        if (this.options.revision)
            args.push(...["-r", this.options.revision.toString()]);

        if (this.options.start || this.options.end) {
            args.push("-r");

            let formattedStart = "1";

            if (this.options.start) {
                const startMt = moment.utc(this.options.start, moment.ISO_8601, true);

                formattedStart = startMt.isValid() ? `{${startMt.format("YYYY-MM-DD")}}` : "1";
            }

            let formattedEnd = "HEAD";

            if (this.options.end) {
                const endMt = moment.utc(this.options.end, moment.ISO_8601, true);

                formattedEnd = endMt.isValid() ? `{${endMt.format("YYYY-MM-DD")}}` : "HEAD";
            }

            args.push(`${formattedStart}:${formattedEnd}`);
        }

        if (this.options.paths)
            args.push("-v");

        args.push(this.options.source);

        if (this.options.targets)
            args.push(...this.options.targets);

        return args;
    }

    async transform(xml) {
        const obj = await parseXml(xml);

        if (!obj.log.logentry)
            return [];

        return obj.log.logentry.map(x => ({
            revision: parseInt(x.$.revision, 10),
            author: x.author[0],
            date: moment(x.date[0]),
            message: x.msg[0],
            paths: x.paths && x.paths[0].path.map(y => y._)
        }));
    }
}