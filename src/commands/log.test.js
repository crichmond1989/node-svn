import moment from "moment";

import log from "./log.js";

const svnLocal = __dirname + "/../../resources/fake-svn-project";
const svnUrl = "https://svn.code.sf.net/p/svnbook/source";

it("args: default start to 1", () => {
    const result = new log({ source: svnLocal, end: "20180913" }).parseArgs();

    expect(result).toContain("1:{2018-09-13}");
})

it("args: default end to HEAD", () => {
    const result = new log({ source: svnLocal, start: "20180913" }).parseArgs();

    expect(result).toContain("{2018-09-13}:HEAD");
})

it("args: Date object", () => {
    const result = new log({ source: svnLocal, start: new Date("2018-09-13") }).parseArgs();

    expect(result).toContain("{2018-09-13}:HEAD");
})

it("args: moment object", () => {
    const result = new log({ source: svnLocal, start: moment("2018-09-13") }).parseArgs();

    expect(result).toContain("{2018-09-13}:HEAD");
})

it("args: respect timezone", () => {
    const result = new log({ source: svnLocal, start: moment("2018-09-13T00:00:00+0500") }).parseArgs();

    expect(result).toContain("{2018-09-12}:HEAD");
})

it("args: paths adds verbosity flag", () => {
    const result = new log({ source: svnLocal, paths: true }).parseArgs();

    expect(result).toContain("-v");
})

it("uses: local svn", async () => {
    const result = await new log({ source: svnLocal, limit: 1 }).exec();

    expect(result).toHaveLength(1);
})

it("uses: remote svn", async () => {
    const result = await new log({ source: svnUrl, limit: 1 }).exec();

    expect(result).toHaveLength(1);
})

it("uses: revision number", async () => {
    const revision = 5615;
    const result = await new log({ source: svnLocal, limit: 1, revision }).exec();

    expect(result[0].revision).toBe(revision);
})

it("uses: start", async () => {
    const start = "2018-01-26";
    const result = await new log({ source: svnLocal, limit: 1, start }).exec();

    expect(result[0].date.valueOf()).toBeGreaterThanOrEqual(moment(start).valueOf());
})

it("uses: end", async () => {
    const end = "2018-01-26";
    const result = await new log({ source: svnLocal, limit: 1, end }).exec();

    expect(result[0].date.valueOf()).toBeLessThanOrEqual(moment(end).valueOf());
})

it("returns: 1 result without path", async () => {
    const result = await new log({ source: svnLocal, limit: 1 }).exec();

    expect(result).toHaveLength(1);
    expect(result[0].paths).toBeFalsy();
})

it("returns: 1 result with path", async () => {
    const result = await new log({ source: svnLocal, limit: 1, paths: true }).exec();

    expect(result).toHaveLength(1);
    expect(result[0].paths).toBeTruthy();
})

it("returns: 2 results", async () => {
    const result = await new log({ source: svnLocal, limit: 2 }).exec();

    expect(result).toHaveLength(2);
})

it("throws: source is required", async () => {
    try {
        new log();
        fail();
    } catch (error) {
        expect(error.message).toBe("source is required");
    }
})

it("throws: choose between revision or using start and/or end", () => {
    try {
        new log({ source: svnLocal, revision: 1, start: "20180913" });
        fail();
    } catch (error) {
        expect(error.message).toBe("must choose between revision or using start and/or end");
    }
})

it("throws: is not a working copy", async () => {
    try {
        await new log({ source: svnLocal + "nope" }).exec();
        fail();
    } catch (error) {
        expect(error.message).toMatch(/is not a working copy/);
    }
})

it("throws: unable to connect to a repository", async () => {
    try {
        await new log({ source: "https://nope.nope" }).exec();
        fail();
    } catch (error) {
        expect(error.message).toMatch(/Unable to connect to a repository/);
    }
})