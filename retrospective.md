# Sprint 1

## What went well

- Robert: Entire Java application has been completed all in sprint 1
- Tasks are all good
- Communication:
    - Standups before each lab
    - We ask questions to each other a lot, both in person and on Discord

## What didn't go well

- Didn’t unit test APIs from the start as they were being made
    - Noah disagrees, need better balance for unit testing
    - Jaya suggestions: spend less energy testing 200 response, more of a focus on testing error responses
    - Jaya discussion: all of our routes are returning 200, not properly returning error codes for invalid/empty requests

## Changes for next sprint

What to do differently:
- Better response time to MRs (not always doing them as we ask for them)
- Better asynchronous communication for requesting a review on MRs

What to keep going:
- Standups, communication in terms of asking questions for clarity

Sprint 2:
- Scrum master: Robert
- Product owner: Noah
- What to accomplish for sprint 2:
    - User authentication
    - More pages (search page, profile page, etc.)
    - Submitting a solution, having it run, display results
    - Ensuring that bugs discovered in other teammates’ code should be communicated with them to some extent to make them feel valued

# Sprint 2

## What went well
- Robert:
    - Having google authentication functional
    - Apply compression and caching for API data
- Gabriel:
    - Working with Alex (and towards the end, Noah) on the search page
    - Populating the tags multi-select element with all possible tags + filtering posts in realtime on tag selection
- Matthew:
    - Initial Google auth setup
    - Getting all the apis related to users working.
- Noah
    - Styling work recieved valuable feedback for accecibility

## What didn't go well
- Robert
    - Have caching disabled when in development environment (reverted the addition to investigate an issue. Didn't have time re-implementing it) 
- Gabriel
    - Using the original dual-slider component I installed for selecting a difficulty range
    - After switching to the actually usable component, hooking it up to the search results, but we got it eventually
- Matthew
    - Getting the user edit form working wasn't smooth.

## Champion Summary
### Robert (unit test coverage):
- I'll not be champion unit test coverage due to:
    - how far we're into the project to see it feasible
        - Causing headaches for other to work around it once implemented  
    - how we're doing more of intergration testing then unit testing
- I'll be championing API documentation instead
    - It'll be a collection of references, tutorials, and examples of how to use our API.
    - This will be done using Swagger.

### Gabriel (CI/CD pipeline):
- Everything has so far been going smoothly for the pipeline on GitLab
    - Towards the end of the sprint, per the teachers request, I modified the linter stage/job to run less frequently
        - I made no modifications to other stages/jobs as they only run on MR to staging or commit to staging
- Azure sometimes gives me problems, but as of right now it seems to be stable
    - I experimented with restricting access to our testing website to only users authenticated through our school's Microsoft group on Azure
        - This had to be changed since it was interfering with our MongoDB connection. Alas, anyone can access it now.
    - On some occasions, some of the environment variables I had set up on Azure reverted to older versions or were gone entirely. I'm not sure why.

### Matthew (Accesibility):
- I have been trying to keep accesibility in mind when reviewing MRs.
    - I have made comments about colors as well as keyboard accesibility. I also made comment about increasing font size  in browser breaking styling.
- I think one area that I could work on more is using more semantic elements. This is especially important for users using screen readers.
- Overall, since we only have 3 sprints, it might be idealistic to think we can check all the boxes in terms of accesibility. There will be compromises. However, I hope that by discusing the subject, both my teammates and myself can learn a bit more about it.

### Noah (Performance)
 - Some performance pitfalls in db access were caught
 - Modified some components responsibilities to share fetch results across components
 - Styles were made with reducing reflow in mind
 - The largets performance issues I've currently identified are:
    1. JS Bundle size
        - ReactJS is huge and should be replaced with any of the much better alternatives, the fact this is industry standard is mildly depressing.
        - Our build system does not perform tree shaking correctly about 50% of downloaded code goes unused
    2. Cold starts on azure take 15-30 seconds, and the VM goes cold pretty quickly, finding a way to mitigate or fix this would be of great benefit to the user experience.

# Sprint 3

## What went well
- Robert:
    - Update session so that its stored in database instead in memory
        - Prevents memory leak
    - Have caching enabled only in production mode
    - Add API documentation to the website

- Alex:
    - global leaderboard got done quickly and was easy enough to implement
    - api routes required for the leaderboard

- Matthew:
    - We decided to remove profile editing after sprint 2 which simplified the profile a lot.
    - After having worked a lot on apis in the previous sprint, I was able to get the api for user answers completed pretty quickly
    -  
## What didn't go well
- Robert:
    - Simplified Google Authentication so that there no involvement with Profile setup. Was getting complicated to manage if session and database is similar or not. And making sure profile setup only accessible for first time users.

- Alex:
    - the current leaderboard took the longest amount of time and it was scrapped just after I finished it, it can be chalked up to unclear features during our sprint planning and miscommunication during sprint phase

- Matthew: 
    - I looked into adding error highlighting to the editor towards the end of the sprint but I found that the documentation for the npm package we used to be a bit lacking. I concluded that it wouldn't be worth it to add this feature this late into the sprint.
## Champion Summary
### Robert (API Documentation):
- I have successfully implemented API documentation onto our project
    - In /api/docs you can view documents of all our routes. Including authentications, problems, and users routes.

### Alex (Mobile Support)
- I conducted some research on whether or not a mobile user was going to be able to use the website effectively without making large changes to the format of the project in the following topics
    - resolution
    - formatting
    - interactivity
- there was not much progress past the research phase, mobile users could interact easily enough and features became more important to complete
- the feature is going to affect a very small population of users (i have no idea who would code on their phone...)
- getting features implemented and the fact that the features were going to be used by everyone instead of mobile support being used by very few people is the reason that the championed feature was abandoned to focus on getting the product out there.

### Matthew (Accesibility)
- I tried to make our website as accesible as possible. Our main priority of course was just to get the features working at all.
- To check accesbility, I mainly use the one that is built in to firefox.
- I terms of color we think we did pretty well, the only weakness being the difficulty scrolling.
- In terms of keyboard accesibility, there is an issue with getting stuck inside thhe code editor if you tab into it.
