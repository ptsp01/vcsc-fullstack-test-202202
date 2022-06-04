const fs = require('fs')
const MESSAGE_EXTRACT_REGEX = /((.+?)=(.+?))/g;

function getMessageContent() {
    const fileName = "./packages/backend/data.tcp"
    return fs.readFileSync(fileName, { encoding: 'utf-8' })
}

function decodeMsg() {
    const file = getMessageContent();
    const matches = file.matchAll(MESSAGE_EXTRACT_REGEX)
    const decodedMsg = [];
    const messageLength = [0, 0]; //[calculating length, max length]

    for (const match of matches) {
        const [fullContent, , key, value] = match;
        switch (key) {
            case '8':
                decodedMsg.push({});
                break;
            case '9':
                messageLength[0] = 0;
                messageLength[1] = +value;
                break;
            default:
                messageLength[0] += fullContent.length;
                if (messageLength[0] > messageLength[1])
                    continue;
        }

        decodedMsg[decodedMsg.length - 1][key] = value;
    }
    return decodedMsg;
}

module.exports = decodeMsg;