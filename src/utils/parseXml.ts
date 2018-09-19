import { parseString } from "xml2js";

export default (xml: string) => new Promise<any>((res, rej) => {
    parseString(xml, (err: Error, result: any) => {
        if (err)
            return rej(err);

        return res(result);
    })
})