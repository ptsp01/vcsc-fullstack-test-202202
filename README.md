# Introduction

Welcome to VCSC's Fullstack developer test. You are required to do the following task. 
#### **You don't need to complete all tasks to pass the test**. 
We value effort more than the perfect skills. Do your best effort to solve the test.

## Project setup
- Fork & clone this repository
- The dependencies are defined in `package.json`. Use `yarn` as package manager to install dependencies.
- Don't change folder structure. The project follows yarn monorepo structure (yarn workspace).
- Don't change the content of `*.spec.js` files.

**Important node: After complete the tasks, make a PR to this repository to submit your work.**

## Front-end: React component
Create a Dropdown component with the following behaviors:
- Open dropdown when click to component
- Close dropdown when click outside
- Use scss/sass module to create default style
- Allow override style by injecting style into component
- Allow custom renderer for each dropdown line
- Allow custom renderer for each active dropdown line
- If you can, try to use, useRef, useImperativeHandle and react Portal to demonstrate your ability to optimize and reduce render call and principle of abstraction and Encapsulation of the component.

**Task:** Write your code in `packages/frontend` folder

## Back-end: Low-level implementation
Decode an IOStream dump stored in [data.tcp](packages/backend/data.tcp) using the following specification:
- The IOStream dump contains several packet data received via TCP.
- Each line contains one packet data
- One or several packet data construct to a message
- The message is delivered in ASCII binary form. Each message contains key-value pair (field) in format `<TAG>=<VALUE>`. Each key-value pair is separated by `<DELIMITER>`, which is ASCII character position 1.
- There are 2 special tags that always appear at the beginning of the message:
  - Tag "8": begin of the message
  - Tag "9": message body length, exclude the length of "8" and "9" field. For example: `"8=FIX4.4<DELIMITER>9=4<DELIMITER>35=A"` means the body is `"35=A"` and contains 4 ascii bytes.
- The TCP dump may contain noise data between messages. Filter those noise to make sure you read the messages properly.

**Task:** write a function named `decodeMsg` in `packages/backend/index.js` that read the IOStream dump and return an array of decoded message in the form of key-value pair. 

For example: `"8=FIX4.4<DELIMITER>9=4<DELIMITER>35=A"` will return
```javascript
[
    {
        8: "FIX4.4",
        9: "4",
        35: "A"
    }
]
```

You can test your implementation by running `yarn test` in project root