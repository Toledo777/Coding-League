# Project League
## Team
- Alessandro Vendramin
- Gabriel Internoscia
- Matthew Toledo
- Noah Labrecque
- Robert Gutkowski

## Description
Project League is a full-stack web application which allows users to partake in JavaScript coding challenges with the goal of improving and expanding their own skills in the JavaScript language. Users can take on these challenges solo or compete with others on a leaderboard.

Features:
- Dataset population:
  - Using a combination of web scraping and a Java setup script to populate the scraped coding problems into the Database with MongoDB.
- Home page:
  - The main page thaat users first see.
  - Description of what the website is about.
  - Has two buttons: go to a random problem, and go to the search page. 
- Problem page:
  - Coding problem is shown with their title and description.
  - A Code Editor is displayed which users can code their answers into.
    - The code upon load will either be user's answer, local storage answer, or default template.
  - Debug btn: Code Runner runs user's code with few test cases, and determine if they each pass. 
  - Submit btn: will do similar action as debug, however:
    - Code Runner runs more test cases that weren't shown to the user.
    - User's answer gets inserted into database.
      - If all test cases passes, give them points.
        - Only first submit pass will give points, subsequent submits gives 0 points.
      - If at least 1 test case fail, no points. But they can still attempt again.
- Point calculation:
  - When giving EXP to user
    - base point is provided (100)
    - Fetches attempts from all users, ratioed by those who pass.
    - If it's a first clear, give first clear bonus points (175)
    - If not first clear, use these calculations:
      - calculation = base * (attempts / passes)
      - points = base + calculation
    - Once calculated, give these points to the user by updating their User entry
- Google authentication:
  - Users can sign in using their Google account
  - If first time user, insert a new User instance into our Database
  - Subsequent sign-ins will retireve user info from our Database
- Search page:
  - Users can search for coding problems by title and description.
  - They can filter the search results by tags and difficulty
  - Clicking 'code' button on one of the problem results will navigate to the solve page for that problem.
  - Their search result gets save when they leave the page, and is loaded back in when they return.
- Profile page:
  - A page showcasing a registered user on our site.
  - Displays email, username, and avatar.
- Leaderboard page:
  - Showcases the top 10 users from our website, determined by their EXP.
  - If logged in, the current user will also be shown in the leaderboard, and what's their current position is.
- History page:
  - If logged in, showcase user's previous coded answers they submit to our website.
  - They can click on View Problem button to redirect to the solve page of the problem.

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
