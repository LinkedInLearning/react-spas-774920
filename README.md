# React: SPAs
This is the repository for the LinkedIn Learning course React: SPAs. The full course is available from [LinkedIn Learning][lil-course-url].

## Course details 
You know the basics of React, but now you want to build a production-ready project. It's time to dig deeper than the UI. React: SPAs shows you how to build a polished single-page application (SPA), with tools for managing users and reading and writing data from a database. Instructor Ray Villalobos shows you how create React components, add user authentication and authorization, and integrate a Firebase database with custom routing. The project you complete in this course will allow you take your React projects to the next level, and create full-featured user experiences that are fluid and responsive, without constant page loads.

### Learning objectives
- Routing
- Integrating Firebase
- Managing state in forms
- Registering users
- Logging users in and out
- Creating, editing, and deleting records from Firebase
- Filtering and searching data

## Instructions

This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage. Or you can simply add `/tree/BRANCH_NAME` to the URL to go to the branch you want to peek at.

## Branches

The branches are structured so that they correspond to the videos in the course. So, for example if I name a branch `02_03` then that branch corresponds to the second chapter and the third video in that chapter. The extra letter at the end of the name corresponds to the state of the branch. A `b` means that this is how the code looks at the beginning of the video, an `e` means that is how the code looked at the end of the video. The `master` branch usually has the final state of the code when I finish the course.

## Installing

1. Make sure you have these installed
   - [node.js](http://nodejs.org/)
   - [git](http://git-scm.com/)
2. Clone this repository into your local machine using the terminal (mac) or Gitbash (PC) `> git clone CLONEURL`
3. CD to the folder `cd FOLDERNAME`
4. Run `npm install` to install the project dependencies
5. Run `npm start` to start live preview server

## Downloading All Branches

For more advanced users, you can also download all of the branches for this repository.

1.  `mkdir NAME`
1.  `cd NAME`
1.  `git clone --bare CLONEURL .git` (make sure you add extra .git)
1.  `git config --bool core.bare false`
1.  `git reset --hard`
1.  Run `npm install` to install the project dependencies
1.  Run `npm start` to start live preview server

For advanced instructions of how to work with this and other courses with github repos, check out the course: [Learning Git and Github](https://linkedin-learning.pxf.io/c/1252977/449670/8005?subId1=githubrepo&u=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Flearning-git-and-github):

### Instructor

**Ray Villalobos**

_Senior Staff Instructor at LinkedIn Learning_

Check out some of my other courses on [LinkedIn Learning](https://linkedin-learning.pxf.io/c/1252977/449670/8005?subId1=githubrepo&u=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Finstructors%2Fray-villalobos). You can follow me on [LinkedIn](https://www.linkedin.com/in/planetoftheweb/), read [my blog](http://raybo.org), [follow me on twitter](http://twitter.com/planetoftheweb), or check out my [youtube channel](http://youtube.com/planetoftheweb).

[lil-course-url]: https://www.linkedin.com/learning/react-spas
[lil-thumbnail-url]: https://cdn.lynda.com/course/774920/774920-636770101119345538-16x9.jpg
