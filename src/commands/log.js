import spawn from "../spawn";

export default class {
    constructor(options) {
        options = options || {};

        if (!options.source)
            throw new Error("source is required");

        this.options = options;
    }

    exec() {
        const args = ["log", "--xml"];

        if (this.options.limit)
            args.push(...["-l", this.options.limit.toString()]);

        args.push(this.options.source);

        return spawn("svn", args);
    }
}