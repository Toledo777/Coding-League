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
