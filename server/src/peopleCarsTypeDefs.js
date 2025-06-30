/*  ============================================================================
 *  This file defines the GraphQL schema for the "People and Their Cars" web application.
 *
 *  Types: 
 *    - Person: Represents a person with an ID, first name, last name and a list of cars they own.
 *    - Car: Represents a car with an ID, year, make, model, price, and the ID of the person who owns it.
 * 
 *  Queries:
 *    - personsFull: Fetch all persons and the cars they own. 
 *      - Usage: To display the "Records" list. 
 *    - person: Fetch a person by ID, including their cars.
 *      - Usage: To display the "Person details" page (from the "Learn more" link).
 *    - personList: Fetch all persons without their cars.
 *      - Usage: For the "add car" / "update car" form, where the available persons are to be shown as a dropdown.
 *
 *  Mutations:
 *    - addPerson: Add a new person with first name and last name.
 *      - Usage: "Add person" form.
 *    - updatePerson: Update an existing person's first name and/or last name by the person's ID.
 *      - Usage: "Update person" form.
 *    - removePerson: Remove a person, and all car records associated with the person, by the person's ID.
 *      - Usage: "Remove person" button.
 *    - addCar: Add a new car with year, make, model, price, and the ID of the person who owns it.
 *      - Usage: "Add car" form.
 *    - updateCar: Update an existing car's year, make, model, price and the owner person ID, by the car ID.
 *      - Usage: "Update car" form.
 *    - removeCar: Remove a car by ID.
 *      - Usage: "Remove car" button.
 */
const typeDefs = `
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]!
  }
  
  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }
  
  type Query {
    personsFull: [Person]
    person(id: ID!): Person
    personList: [Person]

  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    removePerson(id: ID!): Person
    addCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car
    updateCar(id: ID!, year: Int, make: String, model: String, price: Float, personId: ID): Car
    removeCar(id: ID!): Car
  }
`
export { typeDefs };
