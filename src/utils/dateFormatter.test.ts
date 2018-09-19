import DateFormatter from "./dateFormatter";

const localDate = new Date("2018-01-01T00:00:00+05:00");
const utcDate = new Date("2018-01-01T00:00:00Z");

describe("local", () => {
    it("converts to UTC", () => {
        const result = DateFormatter.toSvnFormat(localDate);

        expect(result).toBe("{2017-12-31}");
    })
})

describe("utc", () => {
    it("has the correct format", () => {
        const result = DateFormatter.toSvnFormat(utcDate);

        expect(result).toBe("{2018-01-01}");
    })

    it("pads the month", () => {
        const result = DateFormatter.toSvnFormat(utcDate);

        expect(result).toMatch(/\d{4}-01-\d{2}/);
    })

    it("pads the date", () => {
        const result = DateFormatter.toSvnFormat(utcDate);

        expect(result).toMatch(/\d{4}-\d{2}-01/);
    })
})