const fs = require("fs");
const path = require("path");

function decodeMsg() {
  // Your code here
  const DELIMITER = String.fromCharCode(1);
  const dataFromTcp = fs.readFileSync(path.join(__dirname, "data.tcp"), {
    encoding: "ASCII",
  });
  const convertDataToArray = dataFromTcp.split(DELIMITER);
  convertDataToArray.pop(); // delete element empty
  let message = {};
  let result = [];
  for (let item = 0; item < convertDataToArray.length; item++) {
    const locationEqual = convertDataToArray[item].indexOf("=");
    const key = convertDataToArray[item].slice(0, locationEqual);
    const value = convertDataToArray[item].slice(locationEqual + 1);
    if (
      (convertDataToArray[item].includes("8=HNX") && item > 0) ||
      item === convertDataToArray.length - 1
    ) {
      result = [...result, message];
      message = {
        [key]: value,
      };
    } else {
      message[`${key}`] = value;
    }
  }
  console.log("result", result);
  return result;
}
decodeMsg();
module.exports = decodeMsg;
