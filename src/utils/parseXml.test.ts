import parseXml from "./parseXml";

describe("smoketest", () => {
    it("converts elements", async () => {
        const result = await parseXml("<data>something</data>");

        expect(result).toEqual({ data: "something" });
    })

    it("converts attributes", async () => {
        const result = await parseXml("<data value='something' />");

        expect(result).toEqual({ data: { $: { value: "something" } } });
    })

    it("converts arrays", async () => {
        const result = await parseXml("<root><data>a</data><data>b</data></root>");

        expect(result).toEqual({ root: { data: ["a", "b"] } });
    })
})

describe("throws", () => {
    it("Unexpected close tag", async () => {
        try {
            await parseXml("<a><b>x</a></b>");
            fail();
        } catch (error) {
            expect(error.message).toMatch("Unexpected close tag");
        }
    })
})