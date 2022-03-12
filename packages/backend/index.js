const fs = require('fs');

function decodeMsg() {
    // Your code here
    /**
     * Split string into Key-Value Object
     * @param {String} stringData String Data
     * @param {String} splitKey String Data Split
     * @returns Object {key : "string",value : "string"} || null
     */
    function splitKeyValue(stringData, splitKey = "=") {
        let result = null;
        let isValidData = true;
        if (stringData === null ||
            splitKey === null ||
            stringData === undefined ||
            splitKey === undefined ||
            (typeof stringData).toLocaleLowerCase() !== "string" ||
            (typeof splitKey).toLocaleLowerCase() !== "string") {
            return null;
        }
        try {
            if (isValidData) {
                let splitArray = stringData.split(splitKey);
                if (splitArray.length === 2) {
                    result = { key: splitArray[0], value: splitArray[1] };
                }
            }
        } catch (e) {
        }
        return result;
    }
    /**
     * Result of Function to Return
     */
    let result = [];
    /**
     * Key to know when to start a message
     */
    let tagMessageBegin = '8';
    /**
     * Key to know how many length is message take 
     */
    let tagMessageLength = '9';
    /**
     * DELIMITER of each package to know Key-Value
     */
    let DELIMITER_STRING = String.fromCharCode(1);
    /**
     * Regex to check is begin message or not
     */
    let beginMessageRegex = new RegExp(`^${tagMessageBegin}=.+`, 'i');
    /**
     * Regex to check is contain information about message length
     */
    let lengthMessageRegex = new RegExp(`^${tagMessageLength}=\\d+`, 'i');
    /**
     * Path file read
     */
    let filePath = `${__dirname}/data.tcp`;
    if (!fs.existsSync(filePath)) return result;

    let steamReader = fs.readFileSync(filePath, { encoding: "ascii" });
    let steamAllData = steamReader.split(DELIMITER_STRING).filter(x => x != '');
    let isStartMessage = false;
    let messageLengthLimit = 0;
    let messageLengthCurrent = 0;
    let messageBody = {};
    let resetToDefaultValue = function () {
        isStartMessage = false;
        messageLengthLimit = 0;
        messageLengthCurrent = 0;
        messageBody = {};
    }
    for (let i = 0; i < steamAllData.length; i++) {
        const dataLine = steamAllData[i];
        let keyValue = splitKeyValue(dataLine);
        if (keyValue === null || keyValue === undefined) continue;
        if (beginMessageRegex.test(dataLine)) {
            if (messageBody[tagMessageBegin] !== null && messageBody[tagMessageBegin] !== undefined) {
                result.push(messageBody);
                resetToDefaultValue();
            }
            isStartMessage = true;
            messageBody[keyValue.key] = keyValue.value;
            continue;
        }
        if (isStartMessage) {
            if (messageLengthLimit == 0) {
                if (lengthMessageRegex.test(dataLine)) {
                    messageBody[keyValue.key] = keyValue.value;
                    if (messageBody[tagMessageLength] === null || messageBody[tagMessageLength] === undefined) {
                        resetToDefaultValue();
                        continue;
                    }
                    try {
                        messageLengthLimit = parseInt(messageBody[tagMessageLength]);
                    } catch { }
                    continue;
                }
                else {
                    resetToDefaultValue();
                    continue;
                }
            }
            if (messageLengthCurrent + dataLine.length > messageLengthLimit) {
                resetToDefaultValue();
                continue;
            }
            messageLengthCurrent += DELIMITER_STRING.length;
            messageBody[keyValue.key] = keyValue.value;
            messageLengthCurrent += dataLine.length;
            if (messageLengthCurrent >= messageLengthLimit) {
                result.push(messageBody);
                resetToDefaultValue();
                continue;
            }
            if (i === steamAllData.length - 1) {
                result.push(messageBody);
                resetToDefaultValue();
                continue;
            }
        }
    }
    return result;
}
module.exports = decodeMsg