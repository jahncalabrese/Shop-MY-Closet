import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation Mutation($products: [ID]!) {
    addOrder(products: $products) {
      _id
      purchaseDate
      products {
        _id
        name
        description
        image
        price
        size
        category {
          _id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($password: String!, $email: String, $username: String) {
    updateUser(password: $password, email: $email, username: $username) {
      _id
      username
      email
      password
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          image
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation Mutation(
    $id: ID!
    $name: String!
    $description: String!
    $size: SizeEnum!
    $price: Float!
    $category: ID!
  ) {
    updateProduct(
      _id: $id
      name: $name
      description: $description
      size: $size
      price: $price
      category: $category
    ) {
      _id
      name
      description
      image
      price
      size
      category {
        _id
        name
      }
    }
  }
`;
