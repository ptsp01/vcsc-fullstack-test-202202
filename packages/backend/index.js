const fs = require("fs");
 
const SPLIT_CHAR = "="; // character separated key and value
const DELIMITER = String.fromCharCode(1); // ASCII character position 1
const DELIMITER_LENGTH = Buffer.byteLength(DELIMITER, "ascii"); // length of delimiter
const TAG_BEGIN = "8"; // tag begin of message
const TAG_BODY_LENGTH = "9"; // tag body length
 
function isStartMessage(beginItem, bodyItem) {
  const beginItems = beginItem.split(SPLIT_CHAR);
  const secondItems = bodyItem.split(SPLIT_CHAR);
 
  if (beginItems[0] === TAG_BEGIN && secondItems[0] === TAG_BODY_LENGTH) {
    return true;
  } else {
    return false;
  }
}
 
function decodeMsg() {
  // Your code here
  const strdata = fs.readFileSync("./packages/backend/data.tcp", {
    encoding: "ASCII",
  });
  let arrResult = [];
 
  if (strdata) {
    const arrData = strdata.split(DELIMITER); // split data to array by delimiter
 
    let obj = new Map();
    let isStart = false; // true: have begin tag; false: have not begin tag
    let iMsgBodyLength = 0; // length of message body
    let iTempMsgLength = 0; // length of temp message body
 
    if (arrData.length >= 2) {
      for (let i = 0; i < arrData.length - 1; i++) {
        if (isStartMessage(arrData[i], arrData[i + 1])) {
          iTempMsgLength = 0;
 
          const [key, value] = arrData[i + 1].split(SPLIT_CHAR);
 
          iMsgBodyLength = Number(value);
 
          iTempMsgLength =
            iTempMsgLength -
            Buffer.byteLength(arrData[i], "ascii") -
            Buffer.byteLength(arrData[i + 1], "ascii") -
            2 * DELIMITER_LENGTH;
 
          isStart = true;
 
          // push before message body if obj has data
          if (obj.size) {
            arrResult.push(Object.fromEntries(obj));
          }
          obj.clear();
        }
 
        // get message body if valid
        if (isStart && arrData[i] !== "" && iTempMsgLength <= iMsgBodyLength) {
          iTempMsgLength += Buffer.byteLength(arrData[i], "ascii") + DELIMITER_LENGTH;
 
          if (iTempMsgLength <= iMsgBodyLength) {
            const [key, value] = arrData[i].split(SPLIT_CHAR);
            obj.set(key, value);
          }
 
          if (iTempMsgLength >= iMsgBodyLength && obj.size) {
            arrResult.push(Object.fromEntries(obj));
            obj.clear();
          }
        }
 
        // check last item
        if (
          isStart &&
          i === arrData.length - 2 &&
          iTempMsgLength <= iMsgBodyLength
        ) {
          if (arrData[i + 1] !== "") {
            iTempMsgLength += Buffer.byteLength(arrData[i + 1], "ascii") + DELIMITER_LENGTH;
 
            if (iTempMsgLength <= iMsgBodyLength && obj.size) {
              const [key, value] = arrData[i + 1].split(SPLIT_CHAR);
              obj.set(key, value);
              arrResult.push(Object.fromEntries(obj));
            }
          }
          obj.clear();
        }
      }
    }
 
  }
 
  return arrResult;
}
 
module.exports = decodeMsg;
