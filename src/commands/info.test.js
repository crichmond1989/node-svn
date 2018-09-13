import config from "../config.js";
import info from "./info.js";

const svnLocal = config.testSvnLocal;
const svnUrl = config.testSvnUrl;

const getRequest = () => ({ source: svnLocal, format: "json" });

it("uses: recursive", async () => {
    const result = await new info({ ...getRequest(), recursive: true }).exec();

    expect(result).toHaveLength(4);
})

it("uses: revision number", async () => {
    const revision = 5615;
    const result = await new info({ ...getRequest(), revision }).exec();

    expect(result[0].revision).toBe(revision);
})