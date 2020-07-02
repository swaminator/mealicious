/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeal = /* GraphQL */ `
  query GetMeal($id: ID!) {
    getMeal(id: $id) {
      id
      name
      description
      rating
      createdAt
      updatedAt
    }
  }
`;
export const listMeals = /* GraphQL */ `
  query ListMeals(
    $filter: ModelMealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
