# Testing
1. `cd ../../ & yarn test`

*Note: I have put additional tests in an additional file.

# Explanation
It is understood that there is no noise within 1 message. So if a start tag and a length tag are detected consecutively, no noise is expected immediately after the `9=` tag.

As this is for decoding a stream of messages, the function only processes 1 character at a time.

Since the functions are pure, multiple independant streams can be processed simultaneously.

