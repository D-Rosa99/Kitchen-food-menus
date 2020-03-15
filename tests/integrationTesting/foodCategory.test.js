const request = require("supertest");
const { Client } = require("../../App/client/client-model");
const { FoodCategory } = require("../../App/foodCategory/foodCategory-model");
let server;

describe("Retrieve food category from the database", () => {
  const token = new Client({ role: "admin" }).genJWT();

  beforeEach(() => {
    server = require("../../App/index");
  });
  afterEach(async () => {
    server.close();
    await FoodCategory.remove({});
  });

  it("Should retrieve all the food categories from the database", async () => {
    await FoodCategory.collection.insertMany([
      { name: "desayuno" },
      { name: "merienda" }
    ]);

    const test = await request(server)
      .get("/api/food-category")
      .set("x-auth-JWTkey", token);

    expect(test.status).toBe(200);
    expect(test.body.length).toBe(2);
  });

  it("Should return a 400 friendly error when enter a invalid token or none", async () => {
    const test = await request(server).get("/api/food-category");

    expect(test.status).toBe(400);
    expect(test.text).toBe("Invalid token!");
  });

  it("Should retrieve a specific food category", async () => {
    const foodCategory = new FoodCategory({ name: "merienda" });
    await foodCategory.save();

    const test = await request(server)
      .get("/api/food-category/" + foodCategory.name)
      .set("x-auth-JWTkey", token);

    expect(test.status).toBe(200);
    expect(test.body).toHaveProperty("name", foodCategory.name);
  });

  it("Should return a 404 friendly error message if the food category name does not exist", async () => {
    const test = await request(server)
      .get("/api/food-category/desayuno")
      .set("x-auth-JWTkey", token);

    expect(test.status).toBe(404);
    expect(test.text).toBe("FoodCategory not found, invalid name!");
  });
});

describe("Add food category to the database", () => {
  const token = new Client({ role: "admin" }).genJWT();
  afterEach(async () => {
    await FoodCategory.remove({});
  });

  it("Should return a 200 success message when a new food category was added", async () => {
    const test = await request(server)
      .post("/api/food-category")
      .set("x-auth-JWTkey", token)
      .send({ name: "merienda" });

    expect(test.status).toBe(200);
    expect(test.text).toBe("Add it successfully!");
  });

  it("Should return a 400 friendly error message when enter another field that is not need it", async () => {
    const test = await request(server)
      .post("/api/food-category")
      .set("x-auth-JWTkey", token)
      .send({ name: "almuerzo", price: 55 });

    expect(test.status).toBe(400);
  });

  it("Should return a 400 friendly error message when enter a food category already exist in the database", async () => {
    const foodCategory = new FoodCategory({ name: "almuerzo" });
    await foodCategory.save();

    const test = await request(server)
      .post("/api/food-category")
      .set("x-auth-JWTkey", token)
      .send({ name: foodCategory.name });

    expect(test.status).toBe(400);
    expect(test.text).toBe("There's already a category with that name");
  });
});
