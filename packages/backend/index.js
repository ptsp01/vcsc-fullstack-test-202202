const fs = require('fs');

function convertStringToObj(string){
    try {
        const arrConvert = string.split('=')
        let obj = {}
        if(arrConvert.length === 2){
            const entries = new Map([arrConvert]);
            obj = Object.fromEntries(entries);
        }
        return obj;
    } catch (error) {
        
    }
}

function decodeMsg() {
    // Your code here
    const DELIMITER = String.fromCharCode(1); // ASCII character position 1
    const dataSample = fs.readFileSync('./data.tcp', { encoding: "ASCII" });
    let result = [];
    if(dataSample){
        const arrConvert = dataSample.split(DELIMITER); //convert string to arr
        arrConvert.pop();
        let arrTmp = [];
        let objTmp = {};
        for(let i = 0; i < arrConvert.length; i++){
            if(arrConvert[i].includes("8=HNX") && i > 0 || i === arrConvert.length-1){
                arrTmp = [...arrTmp, objTmp]
                objTmp = {...convertStringToObj(arrConvert[i])}
            }else{
                objTmp = {...objTmp, ...convertStringToObj(arrConvert[i])}
            }
        }
        result = arrTmp;
    }
    console.log(result, " result")
    return result;
}

decodeMsg()

module.exports = decodeMsg