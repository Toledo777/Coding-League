# Project League
## Team
- Alessandro Vendramin
- Gabriel Internoscia
- Matthew Toledo
- Noah Labrecque
- Robert Gutkowski

## Description
Project League is a full-stack web application which allows users to partake in coding challenges to improve and expand their own skills, or compete with others. 

Features (so far):
- It uses a combination of web scraping and setup script to populate the problems into MongoDB
- Has a web page which fetches and load a coding problem. The coding problem page will have an IDE for users to submit their answer with JavaScript code.
- Answer which gets submitted will be run by a debugger to determine if it passes the test cases.
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
  - jest, supertest, mongoose, mockingoose
## Getting Started

```sh
# Install dependencies
npm i

# Start the development server with auto reload on change
npm run dev
```

## Azure URL
https://codingleague.azurewebsites.net/

## References
### Web scrape source
https://codeforces.com/problemset/