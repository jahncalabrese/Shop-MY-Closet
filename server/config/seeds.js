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
      description: "1995 Cocacola T-Shirt",
      image: "cocacola-shirt.jpg",
      price: 19.99,
      size: "Small",
      category: categories[0]._id,
    },
    {
      name: "Radical Shirt",
      description: "Totally Radical Awesome Vintage T-Shirt",
      image: "tshirt1.jpeg",
      price: 9.99,
      size: "Large",
      category: categories[0]._id,
    },
    {
      name: "Space Jam Shirt",
      description: "Space Jam T-Shirt",
      image: "tshirt2.jpg",
      price: 14.99,
      size: "Medium",
      category: categories[0]._id,
    },
    {
      name: "Wrangler Shirt",
      description: "Vintage Wrangler Geometric Shirt",
      image: "shirt1.jpg",
      price: 19.99,
      size: "Large",
      category: categories[0]._id,
    },
    {
      name: "Knit Shirt",
      description: "Vintage Knit Button-Up Shirt",
      image: "shirt2.jpeg",
      price: 24.99,
      size: "XXL",
      category: categories[0]._id,
    },
    {
      name: "Western Shirt",
      description: "Vintage Western Design Shirt",
      image: "shirt3.jpg",
      price: 29.99,
      size: "XL",
      category: categories[0]._id,
    },
    {
      name: "Hamsa Shirt",
      description: "Vintage Hamsa Hand Silk Shirt",
      image: "shirt4.jpg",
      price: 34.99,
      size: "Medium",
      category: categories[0]._id,
    },
    {
      name: "Corduroy Shorts",
      description: "Beige Corduroy Shorts",
      image: "shorts1.jpg",
      price: 24.99,
      size: "Small",
      category: categories[1]._id,
    },
    {
      name: "Denim Shorts",
      description: "Vintage Worn Denim Shorts",
      image: "shorts2.jpeg",
      price: 14.99,
      size: "Medium",
      category: categories[1]._id,
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
      name: "Light Jeans",
      description: "Light Wash Jeans",
      image: "jeans2.jpg",
      price: 24.99,
      size: "Large",
      category: categories[1]._id,
    },
    {
      name: "Jeans",
      description: "Regular Wash Jeans",
      image: "jeans1.jpeg",
      price: 29.99,
      size: "XL",
      category: categories[1]._id,
    },
    {
      name: "Pink Hoodie",
      description: "Pink Hooded Sweatshirt",
      image: "hoodie1.jpeg",
      price: 39.99,
      size: "XL",
      category: categories[2]._id,
    },
    {
      name: "Tie-Dye Hoodie",
      description: "Paint Splash Tie-Dye Hooded Sweatshirt",
      image: "hoodie2.jpg",
      price: 39.99,
      size: "Large",
      category: categories[2]._id,
    },
    {
      name: "World Tour Jacket",
      description: "Vintage 1990-1991 Bell Biv Devoe World Tour Jacket",
      image: "jacket1.jpeg",
      price: 49.99,
      size: "XL",
      category: categories[2]._id,
    },
    {
      name: "Member's Only Jacket",
      description: "Vintage Pink Member's Only Jacket",
      image: "jacket2.jpg",
      price: 49.99,
      size: "Large",
      category: categories[2]._id,
    },
    {
      name: "Nike Air Jordan Sneakers",
      description: "Red & Black Nike Air Jordan Sneakers",
      image: "shoes1.jpg",
      price: 149.99,
      size: "Large",
      category: categories[3]._id,
    },
    {
      name: "Leather Shoes",
      description: "Brown Leather Slip-On Shoes",
      image: "shoes2.jpg",
      price: 59.99,
      size: "Medium",
      category: categories[3]._id,
    },
    {
      name: "Clog Sandals",
      description: "Slip-On Clog Sandals",
      image: "shoes3.jpg",
      price: 39.99,
      size: "Small",
      category: categories[3]._id,
    },
    {
      name: "Spiked Belt",
      description: "Black Spiked Belt",
      image: "belt1.jpg",
      price: 19.99,
      size: "Medium",
      category: categories[4]._id,
    },
    {
      name: "Western Belt",
      description: "Western Design Belt",
      image: "belt2.jpg",
      price: 29.99,
      size: "Large",
      category: categories[4]._id,
    },
    {
      name: "Heart Bracelet",
      description: "Gold Bracelet with Heart Design",
      image: "bracelet1.jpg",
      price: 89.99,
      size: "Small",
      category: categories[4]._id,
    },
    {
      name: "Apple Watch",
      description: "Blue-Grey Band Apple Watch",
      image: "watch1.jpg",
      price: 149.99,
      size: "Large",
      category: categories[4]._id,
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
