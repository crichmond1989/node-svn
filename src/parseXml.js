import { parseString } from "xml2js";

export default (xml) => new Promise((res, rej) => {
    parseString(xml, (err, result) => {
        if (err)
            return rej(err);

        return res(result);
    })
})