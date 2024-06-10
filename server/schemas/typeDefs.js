const typeDefs = `
  type Category {
    _id: ID!
    name: String
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    image: String
    price: Float
    size: SizeEnum
    category: Category
  }

  type Order {
    _id: ID!
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input Productinput {
    name: String!
    description: String!
    image: String
    price: Float
    size: SizeEnum
    category: String
  }

  type Query {
    categories: [Category]
    products: [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String, lastName: String, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String!): User
    updateProduct(_id: ID!, name: String!, description: String!, size: SizeEnum!, price: Float!, image: String, category: ID!): Product    
    login(email: String!, password: String!): Auth
    addProduct(productInput: Productinput) : Product
  }

  enum SizeEnum {
    Small
    Medium
    Large
    XL
    XXL
  }
`;

module.exports = typeDefs;
