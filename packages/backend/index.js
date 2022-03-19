/**
 * T:  O(n) + O(m * p) //n matchAll, m number of range, p: body length
 * M: O(m * p)
 * Improvement: synchronous file reading
*/
const fs =  require('fs')
const path = require('path')

function readDataSync(filename){
  try{
    const data = fs.readFileSync(path.resolve(__dirname,filename), "utf8")
    return data
  }catch(err){
    throw err
  }
}

function buildObj(str, startTag, startCode, soh){
  //remove the ascii char after startTag
  const patternLen = startTag.length + startCode.length + 1
  const strWithoutHead = str.slice(patternLen)
  //9=XXX\x01
  //    ^
  const lengthEndingIndex = strWithoutHead.match(soh).index
  const len = parseInt(strWithoutHead.slice(2, lengthEndingIndex))
  //body from the ending head to the len plus the length of the ending head
  const body = strWithoutHead.slice(lengthEndingIndex + 1, len + lengthEndingIndex)
  const tbody = body.split(soh)
  let obj = {}
  for(let i = 0; i <tbody.length; i++){
    let temp = tbody[i].split("=")
    obj[temp[0]] = temp[1]
  }
  const head = {8: startCode, "9": len.toString()}
  return {...head, ...obj}
}

function decoding(data, startTag, startCode, soh){
  const regex = new RegExp(startTag + startCode, 'g')
  const matches = data.matchAll(regex)
  const range = []
  const res = []
  for (const match of matches) {
    range.push(match.index)
  }
  for(let i =0; i <range.length; i++){
    //spliting the string
    let str = data.slice(range[i], range[i+1])
    //find the body
    res.push(buildObj(str, startTag, startCode, soh))
  }
  return res
}

function decodeMsg() {
    // Your code here
  const filename = "data.tcp"
  const soh = "\x01"
  const startTag = "8="
  const startCode = "HNX.TDS.1"  
  const data = readDataSync(filename) 
  const res = decoding(data, startTag, startCode, soh )
  return res
}

decodeMsg()

module.exports = decodeMsg
