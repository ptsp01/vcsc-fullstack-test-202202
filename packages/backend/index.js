const fs = require("fs")

const SOH = '\x01';
const TAG_BEGIN = '8';
const TAG_LENGTH = '9';
const EMPTY = "";
const EQUAL_SIGN = "=";
const file = "./packages/backend/data.tcp";
const ASCII = "ascii";

const isValidPack = (pack = EMPTY) => {
    const [key, value] = pack.split(EQUAL_SIGN);
    return Boolean(key && value);
}

const isStartNewMessage = (p1 = EMPTY, p2 = EMPTY) => {
    return p1.charAt(0) === TAG_BEGIN && p2.charAt(0) === TAG_LENGTH;
}

async function decodeMsg() {
    const results = [];
    const obj = new Map();
    try {
        const data = fs.readFileSync(file, ASCII);
        const array = data?.split(SOH).filter(pack => isValidPack(pack))

        array.forEach((pack, index) => {
            if (isStartNewMessage(pack, array[index + 1])) {
                // Add obj into results if it is not empty
                // Reset obj and start new message:
                if (obj.size) {
                    results.push(Object.fromEntries(obj))
                }

                obj.clear()
            }
            // save data into obj:
            const [key, value] = pack.split(EQUAL_SIGN);
            obj.set(key, value);
            
            // add obj into result and finish extract data:
            const isLastItem = index === array.length - 1;
            if (isLastItem) {
                results.push(Object.fromEntries(obj));
                obj.clear();
            }
        })

        return results;
    } catch (error) {
        console.error(error);
    }  
}

module.exports = decodeMsg