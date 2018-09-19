import "jest-extended";

import Config from "./config";
import InfoResult from "./commands/infoResult";
import Svn from "./app";

const svnLocal = Config.testSvnLocal;
const svnRemote = Config.testSvnUrl;

const getOptions = () => ({ source: svnLocal, format: "json" });

describe("options", () => {
    it("default format is json", () => {
        const client = new Svn();

        expect(client.options.format).toBe("json");
    })

    it("default source is .", () => {
        const client = new Svn();

        expect(client.options.source).toBe(".");
    })

    it("forwards format", async () => {
        const result = await new Svn({ ...getOptions(), format: "text" }).info();

        expect(result).toBeString();
    })

    it("forwards source", async () => {
        const result = await new Svn(getOptions()).log({ limit: 1 });

        expect(result).toHaveLength(1);
    })

    it("overwrites source", async () => {
        const result = await new Svn(getOptions()).info({ source: svnRemote });

        expect((<InfoResult[]>result)[0].repository.root).toBe(svnRemote);
    })
})