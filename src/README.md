# Angular, NodeJS, MongoDB
This project provides a look at getting started using Angular Http functionality and how it can be used
to call a Node.js RESTful service.  

## Angular Concepts Covered

* Using TypeScript classes and modules
* Modules are loaded with System.js
* Using Custom Components
* Using the Http object for Ajax calls along with RxJS observables
* Performing GET, PUT, POST and DELETE requests to the server
* Working with Angular service classes for Ajax calls
* Using Angular databinding and built-in directives

## Software Requirements To Run Locally

* Node.js 8 or higher
* MongoDB 3.2 or higher

### Running the Application Locally

1. Install Node.js (6.10 or higher) and MongoDB (3.2 or higher) on your dev box

    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/installation

2. Execute `mongod` to start the MongoDB daemon if it's not already running

3. Install Nodemon and Gulp: `npm install nodemon gulp -g`

4. Run `npm install` to install app dependencies

5. Run the following Gulp task to copy required Angular modules into the `public` folder: 

    `gulp copy:libs`

6. Run `npm start` to compile the TypeScript and start the server

7. Browse to http://localhost:3000
