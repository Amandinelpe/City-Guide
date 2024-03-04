import { gql } from "@apollo/client";

export const ADD_CITY = gql`
  mutation CreateCity($input: CreateCityInput!) {
    createCity(createCityInput: $input) {
      id
      name
      description
      latitude
      longitude
    }
  }
`;

export const REMOVE_CITY = gql`
  mutation RemoveCity($input: ID!) {
    removeCity(id: $input) {
      id
    }
  }
`;

export const ADD_PLACE = gql`
  mutation CreatePlace($input: CreatePlaceInput!) {
    createPlace(createPlaceInput: $input) {
      id
      name
      latitude
      longitude
      address
      placeType {
        id
        name
      }
      city {
        id
        name
      }
    }
  }
`;

export const REMOVE_PLACE = gql`
  mutation RemovePlace($input: ID!) {
    removePlace(id: $input) {
      id
    }
  }
`;

export const UPDATE_PLACETYPE = gql`
  mutation UpdatePlaceType($input: UpdatePlaceTypeInput!) {
    updatePlaceType(updatePlaceTypeInput: $input) {
      id
      googlePlaceTypeName
      name
      activated
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        id
        email
        firstName
        lastName
        role {
          id
          name
        }
      }
      access_token
    }
  }
`;

export const REGISTER = gql`
  mutation register($input: CreateUserInput!) {
    register(createUserInput: $input) {
      id
      email
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(createReviewInput: $input) {
      id
      rating
      comment
    }
  }
`;
