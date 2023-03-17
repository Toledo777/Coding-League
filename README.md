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
- Google authentication:
  - Users can sign in using their google account
  - If first time user, redirect to setup page so users can choose username, starting skill level, and bio
  - Subsequent sign-ins will retireve info from database
- Search page:
  - Users can search for coding problems by title
  - They can then filter the search results by tags and by specifying a difficulty range
  - Finally, they can click "code" on one of the problem results to navigate to the coding page with that problem loaded in

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
  - jest, supertest, mongoose, mockingoose, eslint, compression, LyraSearch


## Getting Started

### Required ENV variables
- ATLAS_URI (URI for connecting to mongoDB Atlas)
- CODE_RUNNER_URI (deployed website that code will be run from)
- GOOGLE_CLIENT_ID (ID used for Google authentication functionality)
- SECRET (used by express session to salt the session id)

### Optional ENV variables
- NODE_ENV (determines the current environment (dev / prod). If not in ENV, default is set)

### Running Server

```sh
# Install dependencies
npm i

# Start the development server with auto reload on change
npm run dev

# Process for starting production server
npm run build
npm run start
```
### Populating MongoDB data

- pre-requisites:
  -  .env containing:
      - ATLAS_URI (URI for connecting to mongoDB Atlas)
      - FILE_PATH (path of the JSON file containing coding problems)
  - Java Runtime Environment (JRE)
  - Java Development Kit (JDK)
- Running setup script:

```
  java -jar <FILE_PATH>
```

## Azure URL
https://codingleague.azurewebsites.net/

## References
### Web scrape source
https://codeforces.com/problemset/

### Red X & Green Checkmark icons
https://icons8.com/icon/111057/x 
https://icons8.com/icon/rJyHKJgLY7Gc/done
