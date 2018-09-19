export default class {
    static toSvnFormat(source: Date): string {
        const year = source.getUTCFullYear();
        const month = source.getUTCMonth() + 1;
        const date = source.getUTCDate();

        const monthPadded = month < 10 ? "0" + month : month;
        const datePadded = date < 10 ? "0" + date : date;

        return `{${year}-${monthPadded}-${datePadded}}`;
    }
}