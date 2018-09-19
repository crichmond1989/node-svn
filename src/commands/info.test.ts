import Config from "../config";
import Info from "./info";
import InfoResult from "./infoResult";

const svnLocal = Config.testSvnLocal;

const getRequest = () => ({ source: svnLocal, format: "json" });

describe("uses", () => {
    it("recursive", async () => {
        const result = await new Info({ ...getRequest(), recursive: true }).exec();

        expect(result).toHaveLength(4);
    })

    it("revision number", async () => {
        const revision = 5615;
        const result = await new Info({ ...getRequest(), revision }).exec();

        expect((<InfoResult[]>result)[0].revision).toBe(revision);
    })
})

describe("format text", () => {
    it("recursive", async () => {
        const result = await new Info({ ...getRequest(), recursive: true, format: "text" }).exec();
        const matches = (<string>result).split("Revision:").length - 1;

        expect(matches).toBe(4);
    })

    it("revision number", async () => {
        const revision = 5615;
        const result = await new Info({ ...getRequest(), revision, format: "text" }).exec();

        expect(result).toMatch(`Revision: ${revision}`);
    })
})

describe("throws", () => {
    it("source is required", () => {
        try {
            new Info({ source: null })
            fail();
        } catch (error) {
            expect(error.message).toBe("source is required");
        }
    })
})