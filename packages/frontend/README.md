# Testing
1. `cd test && npm install && npm run test`

# Demo
1. `cd test && npm run start`

# Explanation
The dropdown behavior is understood as to be the same as that of the select element in html, which means that there is only 1 active component.
Based on the suggestion by the question, I believe that the use case scenario here is that the custom renderer is expected to be expensive, which means that memoizing could help improve the performance and have put it inside the dropdown menu for demonstration purpose. Nonetheless, this is premature optimization. In reality, the memoization should be done the user component (inside the renderer). However, that would be outside the scope of this exercise (it will be in the test) and thus I have put the memoization inside the dropdown component instead.