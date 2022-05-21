// const { DELIMITER } = require('path');
const { mainModule } = require("process");

const HEADER_TAG = "8=";
const BODY_TAG = "9=";
const DELIMITER = "";
const EQUAL = "=";

function cnvDataPair(data) {
  let result = {};
  if (data && data.includes(DELIMITER)) {
    let pairs = data.split(DELIMITER);
    pairs.forEach((pair) => {
      if (pair.includes(EQUAL)) {
        let data = pair.split(EQUAL);
        let key = data[0];
        let value = data[1];
        result[key] = value;
      }
    });
  }
  return result;
}

function filterNoise(data) {
  if (data && data.includes(HEADER_TAG) && data.includes(BODY_TAG)) {
    let HIndex = data.indexOf(HEADER_TAG);
    let BIndex = data.indexOf(BODY_TAG);
    let nextHIndex = data
      .substring(HIndex + HEADER_TAG.length)
      .indexOf(HEADER_TAG);
    if (nextHIndex && nextHIndex <= BIndex) {
      data = data.substring(nextHIndex);
    }
  }
  return data;
}

function detachHeader(data) {
  let headerIndex = data.indexOf(HEADER_TAG);
  let bodyIndex = data.indexOf(BODY_TAG);
  let headerStr = data.substring(headerIndex, bodyIndex);
  let headerValue = headerStr
    .substring(HEADER_TAG.length, bodyIndex)
    .split(DELIMITER)[0];
  return {
    headerValue: headerValue,
  };
}

function detachBody(data) {
  let bodyRawValue = "";
  let bodyLength = 0;
  if (data && data.includes(BODY_TAG)) {
    let bodyIndex = data.indexOf(BODY_TAG);
    bodyLength = parseInt(
      data.substring(bodyIndex + BODY_TAG.length).split(DELIMITER)[0]
    );
    let bodyStr = data.substring(bodyIndex);
    let bodyBeginIndex = bodyStr.indexOf(DELIMITER);
    let bodyEndIndex = bodyBeginIndex + bodyLength;
    bodyRawValue = bodyStr.substring(bodyBeginIndex, bodyEndIndex);
  }
  return {
    bodyLength: bodyLength,
    bodyRawValue: bodyRawValue,
  };
}

function decodeMsg() {
  const fs = require("fs");
  const raw = fs.readFileSync("./packages/backend/data.tcp", "utf-8");
  let maniStr = raw;
  let filteredData = [];
  while (maniStr.includes(HEADER_TAG) && maniStr.includes(BODY_TAG)) {
    maniStr = filterNoise(maniStr);
    let headerData = detachHeader(maniStr);
    let bodyData = detachBody(maniStr);
    let bodyValue = cnvDataPair(bodyData.bodyRawValue);
    let metaData = {};
    metaData[HEADER_TAG.replace("=", "")] = headerData.headerValue;
    metaData[BODY_TAG.replace("=", "")] = bodyData.bodyLength.toString();
    let data = Object.assign(metaData, bodyValue);
    filteredData.push(data);
    let msgLength =
      HEADER_TAG.length +
      headerData.headerValue.length +
      BODY_TAG.length +
      bodyData.bodyLength.toString().length +
      bodyData.bodyRawValue.length +
      DELIMITER.length;
    maniStr = maniStr.substring(msgLength);
  }
  return filteredData;
}

module.exports = decodeMsg;
