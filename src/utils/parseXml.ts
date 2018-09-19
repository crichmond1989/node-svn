import { parseString } from "xml2js";

export default function (xml: string): Promise<any> {
    return new Promise<any>((res, rej) => {
        parseString(xml, (err, result) => {
            if (err)
                return rej(err);

            return res(result);
        })
    });
}