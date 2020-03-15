# Kitchen-food-menu

A project made in NODEjs and EXPRESS about kitchen and food, only admin users can add, delete and edit meals. Other type of users can buy and see any kind of meal in the menu, every food have a category.

This project is back-end side, it's documented with openApi Swagger to visitors can easily try any request and see how end-points works in a better way.

This project also has JEST to make all the test of it, I implemented unit test and integration test

## Technologies

Here is a list of the technologies I used:

- Node.js
- Express.js
- MongoDB
- CircleCI
- Jest
- Winston
- Husky
- Swagger

## How to run it

- Clone or download the repository to your computer
- Run `npm install`
- Set the JSONWEBTOKEN variable
- Then run `npm start` to execute the project.
- Register yourself with the auth endpoint
- use Postman to send requests to any of the endpoints of the project

## Guide for swagger documentation

[Swagger](https://swagger.io/docs/specification/about/) is a set of open-source tools built around the OpenAPI specification that helps to design, build, document and consume REST APIs.

In the swagger documentation of this project, you can see details information about every end-point of the app. You will see the follow:

- Response status codes of requests
- Parameters you need to run each end-point
- End-point responses
- End-point description
- Dynamically consume the API through swagger

## How to see Swagger documentation

- Clone or download the repository to your computer
- Run `npm install`
- Set the JSONWEBTOKEN variable
- Run `npm start` to execute the project
- open your preferred browser
- Head over to `http://localhost:3000/api/docs` and hit enter
- You should see every end-point of the project
- Click on one of them and you will see the information concerned about that end-point
- Hit `try out` and then `execute` to run it and see the response

## How to run tests

- Clone or download the repository to your computer
- Run `npm install`
- Run `npm test`

## Environment variable

- food_JWTkey
