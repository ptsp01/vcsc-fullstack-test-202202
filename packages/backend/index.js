function decodeMsg() {
    // Your code here
    const fs = require('fs')
    const fileName = "./packages/backend/data.tcp"
    let file = fs.readFileSync(fileName, { encoding: 'ascii' })
    const regex = /([a-zA-Z0-9!@#$&()`.+,/:"_-]+)=([a-zA-Z0-9!@#$&()`.+,/:"_-]+)/g
    const dataArr = [...file.matchAll(regex)]
    const resultMsg = []
    let incrementIndex = -1
    let maxLengthMsg = 0
    let lengthfullMsg = 0
    for (let data of dataArr) {
        //plus 1 for the delimiter
        const lengthMsg = data[0].length + 1
        const keyMsg = data[1].trim()
        const valueMsg = data[2].trim()
        if (keyMsg === '8') {
            incrementIndex++
        } else if (keyMsg === '9') {
            maxLengthMsg = valueMsg
            lengthfullMsg = 0
        } else if ((lengthfullMsg + lengthMsg) <= maxLengthMsg) {
            lengthfullMsg += lengthMsg
        } else {
            continue
        }
        //first index always is 0 
        const index = incrementIndex <= 0 ? 0 : incrementIndex
        resultMsg[index] = { ...resultMsg[index], [keyMsg]: valueMsg }
    }
    return resultMsg

}

module.exports = decodeMsg