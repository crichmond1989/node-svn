import Config from "../config";
import Log from "./log";
import LogResult from "./logResult";

const svnLocal = Config.testSvnLocal;
const svnUrl = Config.testSvnUrl;

const getRequest = () => ({ source: svnLocal, format: "json" });

describe("args", () => {
    it("default start to 1", () => {
        const result = new Log({ ...getRequest(), end: new Date("2018-09-13") }).parseArgs();

        expect(result).toContain("1:{2018-09-13}");
    })

    it("default end to HEAD", () => {
        const result = new Log({ ...getRequest(), start: new Date("2018-09-13") }).parseArgs();

        expect(result).toContain("{2018-09-13}:HEAD");
    })

    it("Date object", () => {
        const result = new Log({ ...getRequest(), start: new Date("2018-09-13") }).parseArgs();

        expect(result).toContain("{2018-09-13}:HEAD");
    })

    it("respect timezone", () => {
        const result = new Log({ ...getRequest(), start: new Date("2018-09-13T00:00:00+0500") }).parseArgs();

        expect(result).toContain("{2018-09-12}:HEAD");
    })

    it("paths adds verbosity flag", () => {
        const result = new Log({ ...getRequest(), paths: true }).parseArgs();

        expect(result).toContain("-v");
    })
})

describe("uses", () => {
    it("local svn", async () => {
        const result = await new Log({ ...getRequest(), limit: 1 }).exec();

        expect(result).toHaveLength(1);
    })

    it("remote svn", async () => {
        const result = await new Log({ ...getRequest(), source: svnUrl, limit: 1 }).exec();

        expect(result).toHaveLength(1);
    })

    it("revision number", async () => {
        const revision = 5615;
        const result = await new Log({ ...getRequest(), limit: 1, revision }).exec();

        expect((<LogResult[]>result)[0].revision).toBe(revision);
    })

    it("start", async () => {
        const start = new Date("2018-01-26");
        const result = await new Log({ ...getRequest(), limit: 1, start }).exec();

        expect((<LogResult[]>result)[0].date.valueOf()).toBeGreaterThanOrEqual(start.valueOf());
    })

    it("end", async () => {
        const end = new Date("2018-01-26");
        const result = await new Log({ ...getRequest(), limit: 1, end }).exec();

        expect((<LogResult[]>result)[0].date.valueOf()).toBeLessThanOrEqual(end.valueOf());
    })

    it("paths", async () => {
        const result = await new Log({ ...getRequest(), limit: 1, paths: true }).exec();

        expect((<LogResult[]>result)[0].paths).toHaveLength(1);
    })

    it("1 target", async () => {
        const targets = ["branches/1.8/tools"];
        const result = await new Log({ ...getRequest(), source: svnUrl, limit: 1, targets }).exec();

        expect(result).toHaveLength(1);
    })

    it("2 targets", async () => {
        const targets = ["branches/1.8/tools", "branches/1.8/vi"];
        const result = await new Log({ ...getRequest(), source: svnUrl, limit: 1, targets }).exec();

        expect(result).toHaveLength(1);
    })
})

describe("format text", () => {
    it("revision number", async () => {
        const revision = 5615;
        const result = await new Log({ ...getRequest(), limit: 1, revision, format: "text" }).exec();

        expect(result).toMatch(`r${revision}`);
    })

    it("start", async () => {
        const start = new Date("2018-01-26");
        const result = await new Log({ ...getRequest(), limit: 1, start, format: "text" }).exec();

        expect(result).toMatch("2018-01-26");
    })

    it("paths", async () => {
        const result = await new Log({ ...getRequest(), limit: 1, paths: true, format: "text" }).exec();

        expect(result).toMatch("Changed paths:");
    })

    it("1 target", async () => {
        const targets = ["branches/1.8/tools"];
        const result = await new Log({ ...getRequest(), source: svnUrl, limit: 1, targets, format: "text" }).exec();

        const matches = (<string>result).split(/r\d+ \|/).length - 1;

        expect(matches).toBe(1);
    })
})

describe("returns", () => {
    it("empty array when over-filtered", async () => {
        const result = await new Log({ ...getRequest(), limit: 1, start: new Date("2200-01-01") }).exec();

        expect(result).toHaveLength(0);
    })

    it("1 result without path", async () => {
        const result = await new Log({ ...getRequest(), limit: 1 }).exec();

        expect(result).toHaveLength(1);
        expect((<LogResult[]>result)[0].paths).toBeFalsy();
    })

    it("1 result with path", async () => {
        const result = await new Log({ ...getRequest(), limit: 1, paths: true }).exec();

        expect(result).toHaveLength(1);
        expect((<LogResult[]>result)[0].paths).toBeTruthy();
    })

    it("2 results", async () => {
        const result = await new Log({ ...getRequest(), limit: 2 }).exec();

        expect(result).toHaveLength(2);
    })
})

describe("throws", () => {
    it("source is required", async () => {
        try {
            new Log();
            fail();
        } catch (error) {
            expect(error.message).toBe("source is required");
        }
    })

    it("choose between revision or using start and/or end", () => {
        try {
            new Log({ ...getRequest(), revision: 1, start: new Date("20180913") });
            fail();
        } catch (error) {
            expect(error.message).toBe("must choose between revision or using start and/or end");
        }
    })

    it("is not a working copy", async () => {
        try {
            await new Log({ ...getRequest(), source: svnLocal + "nope" }).exec();
            fail();
        } catch (error) {
            expect(error.message).toMatch(/is not a working copy/);
        }
    })

    it("unable to connect to a repository", async () => {
        try {
            await new Log({ source: "https://nope.nope" }).exec();
            fail();
        } catch (error) {
            expect(error.message).toMatch(/Unable to connect to a repository/);
        }
    })

    it("when specifying working copy paths, only one target may be given", async () => {
        try {
            await new Log({ ...getRequest(), limit: 1, targets: ["does not matter"] }).exec();
            fail();
        } catch (error) {
            expect(error.message).toMatch(/When specifying working copy paths, only one target may be given/);
        }
    })
})