# Project League
## Team
- Alessandro Vendramin
- Gabriel Internoscia
- Matthew Toledo
- Noah Labrecque
- Robert Gutkowski

## Description
Project League is a full-stack web application which allows users to partake in JavaScript coding challenges with the goal of improving and expanding their own skills in the JavaScript language. Users can take on these challenges solo or compete with others on a leaderboard.

Features (so far):
- It uses a combination of web scraping and a Java setup script to populate the scraped coding problems into MongoDB
- Contains a web page which fetches and loads a coding problem from the MongoDB. The coding problem page will have an IDE for users to submit their solution. Solutions are written in JavaScript code.
- One submitted, user solution will be run by a debugger to determine if it passes certain test cases that are unique to each problem.
  - If pass: move onto a next coding problem.
  - If fail: fix the answer and re-submit.

## Technology Stack
- Languages
  - JavaScript, TypeScript, Java
- Database
  - MongoDB
- Frameworks
  - React, Express.js
- Front-end tools
  - react-route
- Back-end tools
  - jest, supertest, mongoose, mockingoose, eslint
## Getting Started

```sh
# Install dependencies
npm i

# Start the development server with auto reload on change
npm run dev

# Process for starting production server
npm run build
npm run start
```

## Azure URL
https://codingleague.azurewebsites.net/

## References
### Web scrape source
https://codeforces.com/problemset/

### Red X & Green Checkmark icons
https://icons8.com/icon/111057/x 
https://icons8.com/icon/rJyHKJgLY7Gc/done
