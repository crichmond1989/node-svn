import spawn from "./spawn";

const resources = __dirname + "/../../resources";

describe("returns", () => {
    it("correct standard output", async () => {
        const result = await spawn("echo", "test");

        expect(result).toBe("test");
    })
})

describe("throws", () => {
    it("error message", async () => {
        try {
            await spawn("node", resources + "/error-output.js");
            fail()
        } catch (error) {
            expect(error.message).toBe("error");
        }
    })

    it("error code", async () => {
        try {
            await spawn("node", resources + "/error-code.js");
            fail()
        } catch (error) {
            expect(error.message).toBe("Exit code: 99")
        }
    })
})