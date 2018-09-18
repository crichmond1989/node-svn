import Config from "../config";
import Info from "./info";
import InfoResult from "./infoResult";

const svnLocal = Config.testSvnLocal;
const svnUrl = Config.testSvnUrl;

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