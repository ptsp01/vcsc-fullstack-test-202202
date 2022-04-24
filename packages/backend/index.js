const fs = require('fs')
const { exit } = require('process')

function findLengthTagState(val, prevVals) {
    testNext, testPrevVal = findStartTagState(val, prevVals)
    if (val === '=' && prevVals.length > 0 && prevVals[prevVals.length - 1] == '9') {
        return findLengthTagState, [], true
    } else {
        return findLengthTagState, [...prevVals, val], false
    }
}

function findValue(val, prevVals) {
    if (val === 1 && prevVals.length > 0) {
        return true 
    } else {
        return false
    }
}

const MESSAGE_STATE = {
    START: 0,
    LENGTH: 1,
    BODY: 2,
}

const PACKET_STATE = {
    TAG: 0,
    VAL: 1
}
const initialState = {
    messageState: MESSAGE_STATE.START,
    packetState: PACKET_STATE.TAG,
    messageBodyLength: 0,
    wip: [],
    message: {},
    messages: [],
    currentTag: "",
    bodyCharCount: 0,
}

function parse(val, state) {
    if (state.messageState === MESSAGE_STATE.START) {
        if (state.packetState === PACKET_STATE.TAG) {
            if (val === '='.charCodeAt(0)  && state.wip.length > 0 && state.wip[state.wip.length - 1] === '8'.charCodeAt(0)) {
                return {
                    ...state,
                    wip: [],
                    packetState: PACKET_STATE.VAL
                }
            } 
            return {
                ...state,
                wip: [...state.wip, val]
            }
        } else {
            if (val === '='.charCodeAt(0) && state.wip.length > 0 && state.wip[state.wip.length - 1] === '8'.charCodeAt(0)) {
                return {
                    ...state,
                    wip: [],
                }
            } else if (val === 1) {
                return {
                    ...state,
                    wip: [],
                    packetState: PACKET_STATE.TAG,
                    messageState: MESSAGE_STATE.LENGTH,
                    message: {
                        8: String.fromCharCode(...state.wip)
                    }
                }
            } else {
                return {
                    ...state,
                    wip: [...state.wip, val]
                }
            }
        }
    } else if (state.messageState === MESSAGE_STATE.LENGTH) {
        if (state.packetState === PACKET_STATE.TAG) {
            if (val === '='.charCodeAt(0)  && state.wip.length > 0 && state.wip[state.wip.length - 1] === '8'.charCodeAt(0)) {
                return {
                    ...state,
                    wip: [],
                    messageState: MESSAGE_STATE.START,
                    packetState: PACKET_STATE.VAL
                }
            } else if (val === '='.charCodeAt(0)  && state.wip.length > 0 && state.wip[state.wip.length - 1] === '9'.charCodeAt(0)) {
                return {
                    ...state,
                    wip: [],
                    packetState: PACKET_STATE.VAL
                }
            } 
            return {
                ...state,
                wip: [...state.wip, val]
            }
        } else {
            if (val === 1) {
                length = parseInt(String.fromCharCode(...state.wip))
                ret = {
                    ...state,
                    wip: [],
                    packetState: PACKET_STATE.TAG,
                    messageState: MESSAGE_STATE.BODY,
                    message: {
                        ...state.message,
                        9: String.fromCharCode(...state.wip),
                    },
                    messageBodyLength: length,
                    bodyCharCount: 0,
                }
                
                return ret
            } else {
                return {
                    ...state,
                    wip: [...state.wip, val]
                }
            }
        }
    } else if (state.messageState === MESSAGE_STATE.BODY) {
        if (state.packetState === PACKET_STATE.TAG) {
            if (val === '='.charCodeAt(0) && state.wip.length > 0) {
                ret = {
                    ...state,
                    wip: [],
                    packetState: PACKET_STATE.VAL,
                    currentTag: String.fromCharCode(...state.wip),
                    bodyCharCount: state.bodyCharCount + 1,
                }

                return ret
            } 
            return {
                ...state,
                wip: [...state.wip, val],
                bodyCharCount: state.bodyCharCount + 1,
            }
        } else {
            if (val === 1) {
                ret = {}

                if (state.bodyCharCount + 1 === state.messageBodyLength) {
                    /// the end
                    message = {
                        ...state.message,
                        [state.currentTag]: String.fromCharCode(...state.wip)
                    }

                    ret = {
                        ...initialState,
                        messages: [...state.messages, message],
                    }
                } else {
                    ret = {
                        ...state,
                        wip: [],
                        packetState: PACKET_STATE.TAG,
                        messageState: MESSAGE_STATE.BODY,
                        message: {
                            ...state.message,
                            [state.currentTag]: String.fromCharCode(...state.wip)
                        },
                        currentTag: "",
                        bodyCharCount: state.bodyCharCount + 1,
                    }
                }
                
                return ret
            } else {
                return {
                    ...state,
                    wip: [...state.wip, val],
                    bodyCharCount: state.bodyCharCount + 1,
                }
            }
        }
    }

    return state
}

function findStartTagState(val, state) {
    if (val === '=' && state.wip.length > 0 && prevVals[prevVals.length - 1] === '8') {
        return findLengthTagState, [], true
    } else {
        return findStartTagState, [...prevVals, val], false
    }
}

function decodeMsg(fileName) {
    // Your code here
    if (fileName === undefined) {
        fileName = "./packages/backend/data.tcp"
    }
    file = fs.readFileSync(fileName)
    state = {...initialState}
    for (let val of file) {
        state = parse(val, state)
    }

    return state.messages
}

module.exports = decodeMsg