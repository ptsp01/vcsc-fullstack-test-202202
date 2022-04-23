const decodeMsg = require("./index")

result = [
    {'8': 'HNX.TDS.1',
 '9': '254',
 '35': 'SI',
 '49': 'HNX',
 '52': '20220105-09:08:30',
 '15': '61073',
 '55': 'HFX',
 '167': 'ST',
 '225': '00010101-12:01:00',
 '332': '4600',
 '333': '3400',
 '326': '1',
 '260': '4000',
 '425': 'UPC_BRD_01',
 '3301': '622300',
 '334': '10000',
 '140': '4000',
 '388': '20220105',
 '399': '07:41:22',
 '400': '100',
 '109': '1270000.000000',
 '17': '1412',
 '232': '0',
 '336': 'UPC_CON_NML',
 '340': '90',
 '327': '0'},
 {'8': 'HNX.TDS.1',
 '9': '87',
 '35': 'TP',
 '49': 'HNX',
 '52': '20220105-09:08:30',
 '55': 'TVW',
 '425': 'UPC_BRD_01',
 '555': '1',
 '556': '1',
 '133': '18900',
 '1331': '100'}
]

test("should read file properly when eql is the first token", () => {
    const data = decodeMsg("./packages/backend/data.start_with_eql.tcp")
    expect(data).toEqual(result)
})

test("should read file properly when delimiter is the first token", () => {
    const data = decodeMsg("./packages/backend/data.start_with_delimiter.tcp")
    expect(data).toEqual(result)
})

test("should read file properly when file is empty", () => {
    const data = decodeMsg("./packages/backend/data.empty.tcp")
    expect(data).toEqual([])
})

test("should read file properly when 9= comes before 8=", () => {
    const data = decodeMsg("./packages/backend/data.start_with_9.tcp")
    expect(data).toEqual(result)
})