# Kitchen-food-menu

A project made in NODEjs and EXPRESS about kitchen and food, only admin users can add, delete and edit meals. Other type of users can buy and see any kind of meal in the menu, every food have a category.

This project is back-end side, it's documented with openApi Swagger to visitors can easily try any request and see how end-points works in a better way.

## Technologies

Here is a list of the technologies I used:

- Node.js
- Express.js
- MongoDB
- Winston
- Husky
- Swagger

## How to run it

- Clone or download the repository to your computer
- Run `npm install`
- Set the JSONWEBTOKEN variable
- Then run `npm start` to execute the project.
- Register yourself with the auth endpoint
- use Postman to send requies to any of the endpoints of the project

## How to see Swagger documentation

- Clone or download the repository to your computer
- Run `npm install`
- Set the JSONWEBTOKEN variable
- Run `npm start` to execute the project
- open your preferred browser
- Head over to `http://localhost:3000/api/docs` and hit enter
- You should see every end-point of the project
- Click one of them and you will see the information concerned about that end-point
- Hit `try out` to run it and see the response

## Environment variable

- food_JWTkey
