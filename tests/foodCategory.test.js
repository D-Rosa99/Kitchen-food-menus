const {
  getAllFoodCategories
} = require("../App/foodCategory/foodCategory-controllers");
const { FoodCategory } = require("../App/foodCategory/foodCategory-model");

jest.mock("../App/foodCategory/foodCategory-model");

describe("FoodCategory Controllers", () => {
  const request = jest.fn();
  const response = jest.fn();

  response.status = num => ({ json: data => ({ data, status: num }) });

  it("Should retrieve all the food categories from the database", async () => {
    const data = { _id: 1, name: "desayuno", _v: 0 };

    FoodCategory.find = jest.fn(() => data);
    const test = await getAllFoodCategories(request, response);

    expect(test.data).toEqual({ _id: 1, name: "desayuno", _v: 0 });
    expect(test.status).toBe(200);
  });
});
