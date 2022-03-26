const fs = require("fs");

const SPLIT_CHAR = "=";
const START_TAG = "8";
const LENGTH_TAG = "9";
const DELIMITER_CHAR = String.fromCharCode(1);
const LINEBREAK_CHAR = DELIMITER_CHAR + START_TAG + SPLIT_CHAR;

function decodeMsg() {
  let messages = [];

  const readStream = fs.readFileSync(__dirname + "/data.tcp", {
    encoding: "ASCII",
  });

  const parseLine = readStream.split(LINEBREAK_CHAR);

  for (let i = 0; i < parseLine.length; i++) {
    let body = "";
    let message = {};
    let bodyLength = 0;

    const line = parseLine[i];
    const newLine = (i > 0 && START_TAG + SPLIT_CHAR + line) || line;
    const elements = newLine.split(DELIMITER_CHAR);

    for (let j = 0; j < elements.length; j++) {
      const properties = elements[j];
      const msgValue = properties.split(SPLIT_CHAR);

      if (msgValue.length > 1) {
        if (msgValue[0] === START_TAG || msgValue[0] === LENGTH_TAG) {
          if (msgValue[0] === LENGTH_TAG) {
            bodyLength = msgValue[1];
          }
          message[msgValue[0]] = msgValue[1];
        } else {
          body = body + msgValue[0] + SPLIT_CHAR + msgValue[1] + DELIMITER_CHAR;
        }
      }
    }

    const bodyContent = body.substring(0, bodyLength);
    const parseBody = bodyContent.split(DELIMITER_CHAR);

    const newElement = Object.fromEntries(
      parseBody
        .map((element) => {
          return element.split(SPLIT_CHAR);
        })
        .filter((item) => item.length > 1)
    );

    messages.push({ ...message, ...newElement });
  }
  return messages;
}

module.exports = decodeMsg;
