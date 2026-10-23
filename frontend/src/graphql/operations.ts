
import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query GetUserToken($email: String!, $password: String!) {
    getUserToken(email: $email, password: $password)
  }
`;


export const SIGN_UP = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    )
  }
`;

export const CURRENT_USER = gql`
  query GetCurrentLoggedInUser {
    getCurrentLoggedInUser {
      id
      firstName
      lastName
      username
      email
      profileImageURL
    }
  }
`;

export const GET_THREADS = gql`
  query GetThreads {
    threads(limit: 20) {
      id
      content
      authorId
      author {
        id
        firstName
        lastName
        username
        profileImageURL
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_THREAD = gql`
  mutation CreateThread($content: String!) {
    createThread(content: $content) {
      id
      content
      authorId
      author {
        id
        firstName
        lastName
        username
        profileImageURL
      }
      createdAt
      updatedAt
    }
  }
`;
