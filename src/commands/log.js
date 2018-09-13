import parseXml from "../parseXml.js";
import spawn from "../spawn";

export default class {
    constructor(options) {
        options = options || {};

        if (!options.source)
            throw new Error("source is required");

        this.options = options;
    }

    async exec() {
        const args = ["log", "--xml"];

        if (this.options.limit)
            args.push(...["-l", this.options.limit.toString()]);

        if (this.options.paths)
            args.push("-v");

        args.push(this.options.source);

        const xml = await spawn("svn", args);

        return await this.transform(xml);
    }

    async transform(xml) {
        const obj = await parseXml(xml);

        return obj.log.logentry.map(x => ({
            revision: x.$.revision,
            author: x.author[0],
            date: x.date[0],
            message: x.msg[0],
            paths: x.paths && x.paths[0].path.map(y => y._)
        }));
    }
}