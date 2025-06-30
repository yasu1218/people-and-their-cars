import { gql } from '@apollo/client'

// GraphQL queries and mutations for managing people and their cars

// ==================================================================
// Query to get all people and their cars
export const GET_PERSONS = gql`
  query PersonsFull {
    personsFull {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`

// ==================================================================
// Query to get one person and the cars owned by that person
export const GET_PERSON = gql`
  query GetPerson($id: String!) {
    person(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`

// ==================================================================
// Query to get all persons (no cars, just the person details)
export const GET_PERSONS_LIST = gql`
  query GetPersonsList {
    personsList {
      id
      firstName
      lastName
    }
  }
`

// ==================================================================
// Mutation to add a new person
export const ADD_PERSON = gql`
  mutation Mutation($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`

// ==================================================================
// Mutation to update an existing person
export const UPDATE_PERSON = gql`
  mutation Mutation($updatePersonId: ID!, $firstName: String, $lastName: String) {
    updatePerson(id: $updatePersonId, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`

// ==================================================================
// Mutation to remove a person
export const REMOVE_PERSON = gql`
  mutation RemovePerson($removePersonId: ID!) {
    removePerson(id: $removePersonId) {
      id
      firstName
      lastName
    }
  }
`

// ==================================================================
// Mutation to add a new car for a person
export const ADD_CAR = gql`
  mutation AddCar($year: Int!, $make: String!, $model: String!, $price: Float!, $personId: ID!) {
    addCar(year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

// ==================================================================
// Mutation to update an existing car
export const UPDATE_CAR = gql`
  mutation UpdateCar($updateCarId: ID!, $year: Int, $make: String, $model: String, $price: Float, $personId: ID!) {
    updateCar(id: $updateCarId, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
// ==================================================================
// Mutation to remove a car
export const REMOVE_CAR = gql`
  mutation RemoveCar($removeCarId: ID!) {
    removeCar(id: $removeCarId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

