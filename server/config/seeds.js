const db = require("./configuration");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    // [0]
    { name: "Tops" },
    // [1]
    { name: "Bottoms" },
    // // [2]
    { name: "Outerwear" },
    // // [3]
    { name: "Shoes" },
    // // [4]
    { name: "Accessories" },
  ]);
  console.log("categories seeded");

  const products = await Product.insertMany([
    {
      name: "CocaCola Shirt",
      description: "1995 Cocacola Shirt",
      image: "cocacola-shirt.jpg",
      price: 19.99,
      size: "XXL",
      category: categories[0]._id,
    },
    {
      name: "Pants",
      description: "pleated pants",
      image: "pleated-pants.jpg",
      price: 19.99,
      size: "Large",
      category: categories[1]._id,
    },
    {
      name: "CocaCola Shirt",
      description: "1995 Cocacola Shirt",
      image: "cocacola-shirt.jpg",
      price: 19.99,
      size: "Medium",
      category: categories[0]._id,
    },
    {
      name: "CocaCola Shirt",
      description: "1995 Cocacola Shirt",
      image: "cocacola-shirt.jpg",
      price: 19.99,
      size: "Small",
      category: categories[0]._id,
    },
    {
      name: "CocaCola Shirt",
      description: "1995 Cocacola Shirt",
      image: "cocacola-shirt.jpg",
      price: 19.99,
      size: "XL",
      category: categories[0]._id,
    },
  ]);

  console.log("products seeded");

  await User.create({
    firstName: "John",
    lastName: "Smith",
    email: "john@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id],
      },
    ],
  });
  console.log("users seeded");
  process.exit();
});
