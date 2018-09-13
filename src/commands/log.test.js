import log from "./log.js";

const svnUrl = "https://svn.code.sf.net/p/svnbook/source";

it("returns: 1 result without path", async () => {
    const result = await new log({ source: svnUrl, limit: 1 }).exec();

    expect(result).toHaveLength(1);
    expect(result[0].paths).toBeFalsy();
})

it("returns: 1 result with path", async () => {
    const result = await new log({ source: svnUrl, limit: 1, paths: true }).exec();

    expect(result).toHaveLength(1);
    expect(result[0].paths).toBeTruthy();
})

it("returns: 2 results", async () => {
    const result = await new log({ source: svnUrl, limit: 2 }).exec();

    expect(result).toHaveLength(2);
})

it("throws: source is required", async () => {
    try {
        await new log().exec();
        fail("expected a missing argument error");
    } catch (error) {
        expect(error.message).toBe("source is required");
    }
})

it("throws: unable to connect to a repository", async () => {
    try {
        await new log({ source: "https://nope.nope" }).exec();
        fail("expected a connection error");
    } catch (error) {
        expect(error.message).toMatch(/Unable to connect to a repository/);
    }
})