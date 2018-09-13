import log from "./log.js";

it("returns: 1 result", async () => {
    const result = await new log({ source: "https://svn.code.sf.net/p/svnbook/source", limit: 1 }).exec();

    expect(result).toBeTruthy();
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