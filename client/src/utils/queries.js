import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query Query($id: ID!) {
    product(_id: $id) {
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

export const QUERY_ALL_PRODUCTS = gql`
  query Products {
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
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          size
          image
        }
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query Order($id: ID!) {
    order(_id: $id) {
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

export const QUERY_CHECKOUT = gql`
  query checkout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
