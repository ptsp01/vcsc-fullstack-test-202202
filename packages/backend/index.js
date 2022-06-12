const fs = require('fs')

const fileName = "./data.tcp"
const REGEX = /(.{1,}?)=(.{1,}?)/g;
function decodeMsg() {
    // Your code here
    const inputData = fs.readFileSync(fileName, { encoding: 'utf-8' })

    const matches = inputData.matchAll(REGEX)

    const rs = [];

    for (const match of matches) {
        console.log(match);

        const [, key, value] = match;
        if (key == '8') {
            rs.push({});
        }
        rs[rs.length - 1][key] = value;
    }
    return rs;
}
module.exports = decodeMsg