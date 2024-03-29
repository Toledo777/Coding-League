# Project League

## Description
Project League is a full-stack web application which allows users to partake in JavaScript coding challenges with the goal of improving and expanding their own skills in the JavaScript language. Users can take on these challenges solo or compete with others on a leaderboard.

Features:
- It uses a combination of web scraping and a Java setup script to populate the scraped coding problems into MongoDB
- Contains a web page which fetches and loads a coding problem from the MongoDB. The coding problem page will have an IDE for users to submit their solution. Solutions are written in JavaScript code.
- One submitted, user solution will be run against a series of test cases to determine if it passes certain test cases that are unique to each problem.
  - If all cases pases, the user can move onto a new coding problem.
  - If a test fails, the user can fix their answer and re-submit.
- Google authentication:
  - Users can sign in using their google account
  - If first time user, redirect to setup page so users can enter their username, starting skill level, and bio
  - Subsequent sign-ins will retireve info from database
- Search page:
  - Users can search for coding problems by title
  - They can then filter the search results by tags and by specifying a difficulty range
  - Finally, they can click "code" on one of the problem results to navigate to the coding page with that problem loaded in
- Profile page:
  - A page for specific registered users can be viewed.

## Team
- Alessandro Vendramin
- Gabriel Internoscia
- Matthew Toledo
- Noah Labrecque
- Robert Gutkowski

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

## Azure URL (No longer deployed 😞)
https://codingleague.azurewebsites.net/

## References
### Web scrape source
https://codeforces.com/problemset/

### Red X & Green Checkmark icons
https://icons8.com/icon/111057/x 
https://icons8.com/icon/rJyHKJgLY7Gc/done
