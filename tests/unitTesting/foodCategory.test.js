const {
  getAllFoodCategories,
  getFoodCategoryByName,
  addFoodCategory
} = require("../../App/foodCategory/foodCategory-controllers");
const {
  FoodCategory,
  validFoodCategory
} = require("../../App/foodCategory/foodCategory-model");

jest.mock("../../App/foodCategory/foodCategory-model");

const request = jest.fn();
const response = jest.fn();

response.status = num => ({
  json: data => ({ data, status: num }),
  send: message => ({ message, status: num })
});

describe("Retrieve food category from the database", () => {
  it("Should retrieve all the food categories from the database", async () => {
    const data = { _id: 1, name: "desayuno", _v: 0 };

    FoodCategory.find = jest.fn(() => data);
    const test = await getAllFoodCategories(request, response);

    expect(test.status).toBe(200);
    expect(test.data).toEqual({ _id: 1, name: "desayuno", _v: 0 });
  });

  it("Should retrieve a specific food category from the database", async () => {
    FoodCategory.findOne.mockResolvedValue({
      _id: 5,
      name: "desayuno",
      _v: 0
    });

    request.params = { name: "desayuno" };
    const test = await getFoodCategoryByName(request, response);

    expect(request.params.name).toBeDefined();
    expect(typeof request.params.name).toBe("string");
    expect(test.status).toBe(200);
    expect(test.data).toMatchObject({ _id: 5, name: "desayuno", _v: 0 });
  });

  it("Should return a 'not found message' if there is not any food category with the name you entered", async () => {
    FoodCategory.findOne.mockResolvedValue(null);

    const test = await getFoodCategoryByName(request, response);

    expect(test.status).toBe(404);
    expect(test.message).toBe("FoodCategory not found, invalid name!");
  });
});

describe("Add a food category to the database", () => {
  it("Should return a friendly error message if you enter other field that it no needs", async () => {
    validFoodCategory.mockImplementation(() => ({
      error: { message: "There is a field that should not be there" },
      value: false
    }));

    const test = await addFoodCategory(request, response);

    expect(test.status).toBe(400);
    expect(test.message).toBe("There is a field that should not be there");
  });

  it("Should return an friendly error message for a value that is already in the database", async () => {
    validFoodCategory.mockImplementation(() => ({
      error: false,
      value: { name: "desayuno" }
    }));

    FoodCategory.findOne.mockResolvedValue(true);

    const test = await addFoodCategory(request, response);

    expect(test.status).toBe(400);
    expect(test.message).toBe("There's already a category with that name");
  });

  it("Should return an friendly confirmation message if the document was add it successfully", async () => {
    validFoodCategory.mockImplementation(() => ({
      error: false,
      value: { name: "desayuno" }
    }));

    FoodCategory.findOne.mockResolvedValue(false);
    FoodCategory.save = jest.fn(() => true);
    const test = await addFoodCategory(request, response);

    expect(test.status).toBe(200);
    expect(test.message).toBe("Add it successfully!");
  });
});
