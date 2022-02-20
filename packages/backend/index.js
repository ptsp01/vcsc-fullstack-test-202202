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

const isTagBegin = (p = EMPTY) => p.split(EQUAL_SIGN)[0] === TAG_BEGIN;

const isTagLength = (p = EMPTY) => p.split(EQUAL_SIGN)[0] === TAG_LENGTH;

function decodeMsg() {
    const results = [];
    const obj = new Map();
    let maxLength = 0;
    let count = 0;
    try {
        const data = fs.readFileSync(file, ASCII);
        const array = data?.split(SOH).filter(pack => isValidPack(pack));

        array.forEach((pack, index) => {
            // Start new message:
            if (isTagBegin(pack) && isTagLength(array[index + 1])) {
                // Add obj into results if it is not empty
                if (obj.size) {
                    results.push(Object.fromEntries(obj));
                }

                // Reset obj and start new message:
                obj.clear();
                maxLength = Number(array[index + 1].split(EQUAL_SIGN)[1]);
                count = 0;
            }

            // save data into obj:
            if (count < maxLength) {
                const [key, value] = pack.split(EQUAL_SIGN);
                obj.set(key, value);
            }

            // update count:
            if (!isTagBegin(pack) && !isTagLength(pack)) {
                count += (pack.length + 1); // +1 <DELIMITER> character.
            }
            
            // if this is last item
            // we push the current obj into results and finish extracting data:
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