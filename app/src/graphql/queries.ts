import { gql } from "@apollo/client";

export const GET_PLACE_TYPES = gql`
  query {
    placeTypes {
      id
      googlePlaceTypeName
      name
      activated
    }
  }
`;

export const GET_CITIES = gql`
  query {
    cities {
      id
      name
      description
      latitude
      longitude
      image
    }
  }
`;

export const GET_PLACES = gql`
  query {
    places {
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

export const GET_PLACES_BY_CITY = gql`
  query getPlacesByCity($cityId: ID!) {
    placesByCity(cityId: $cityId) {
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
      averageRating
      reviews {
        id
        rating
        comment
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
