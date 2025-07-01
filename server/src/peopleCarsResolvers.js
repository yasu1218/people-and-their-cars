import find from 'lodash/find'; 
import remove from 'lodash/remove'; 
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const { people, cars } = require('./peopleCarsScheme'); // Scheme containing initial data
const { typeDefs } = require('./peopleCarsTypeDefs'); // Type definitions for the GraphQL schema

// GraphQL resolvers for the schema
// These functions will be called when the corresponding queries or mutations are executed

const resolvers = {
  // ================================================================
  // Queries: 
  Query: {
    // ----------------------------------------------------
    // personsFull: [Person]
    // Get all persons with their cars
    personsFull: () => {
      if (!people) return [];
      return people.map(person => ({
        ...person,
        cars: cars.filter(car => car.personId === person.id)
      }));
    },
    // ----------------------------------------------------
    // person(id: ID!): Person
    // Get one person by id with the person's cars
    person: (_root, args) => {
      const person = find(people, { id: args.id });
      if (!person) {
        throw new Error(`Person with id ${args.id} not found`);
      }
      return {
        ...person,
        cars: cars.filter(car => car.personId === person.id)
      };
    },
    // ----------------------------------------------------
    // personsList: [Person]
    // Get id, firstName and lastName of all persons (no car information)
    personsList: () => {
      return people.map(person => ({
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName
      }));
    },
    // ----------------------------------------------------
    // carsList: [Car]
    // Get all cars data
    carsList: () => {
      return cars.map(car => ({
        ...car
      }));
    }
  },
  // ================================================================
  // Mutations: 
  Mutation: {
    // ----------------------------------------------------
    // addPerson(firstName: String!, lastName: String!): Person
    // Add a new person
    addPerson: (_root, args) => {
      // Additional validations: 
      // (none)

      // Create new person object 
      const newPerson = {
        id: uuidv4(), // Generate a new unique ID
        firstName: args.firstName,
        lastName: args.lastName,
      };

      // Add the new person to the people array
      people.push(newPerson);
      // Return full person object including an empty cars array
      return {
        ...newPerson,
        cars: [] // Initialize with an empty array for cars
      };
    },
    // ----------------------------------------------------
    // updatePerson(id: ID!, firstName: String, lastName: String): Person
    // Update a person by id
    updatePerson: (_root, args) => {
      // Find the person by id
      const person = find(people, { id: args.id });
      if (!person) {
        throw new Error(`Person with id ${args.id} not found`);
      }

      // Additional validations: 
      // (none)

      // Update person's data if provided 
      person.firstName = args.firstName || person.firstName;
      person.lastName = args.lastName || person.lastName;

      // Return the updated person object including their cars
      return {
        ...person,
        cars: cars.filter(car => car.personId === person.id) // Return updated person with their cars
      }
    },
    // ----------------------------------------------------
    // removePerson(id: ID!): Person
    // Remove a person by id
    removePerson: (_root, args) => {
      // Find the person by id
      const removedPerson = find(people, { id: args.id });
      if (!removedPerson) {
        throw new Error(`Person with id ${args.id} not found`);
      }
      // Remove the person from the people data
      remove(people, { id: args.id });
      // Remove all cars associated with the removed person
      remove(cars, { personId: args.id });
      // Return the removed person object (maybe useful for UI updates)
      return removedPerson;
    },
    // ----------------------------------------------------
    // addCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car
    // Add a new car
    addCar: (_root, args) => {
      // Additional validations: 
      // 1. Ensure that the personId exists
      const personExists = find(people, { id: args.personId });
      if (!personExists) {
        throw new Error(`Person with id ${args.personId} not found`);
      }
      // 2. Price validation: Ensure price is a positive number
      if (args.price <= 0) {
        throw new Error(`Price must be a positive amount`);
      }
      // Note: Year, make, model are not validated here, but validation could be added as needed

      // Create new person object 
      const newCar = {
        id: uuidv4(), // Generate a new unique ID
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      // Add the new car to the cars array and return it
      cars.push(newCar);
      return newCar;
    },
    // ----------------------------------------------------
    // updateCar(id: ID!, year: Int, make: String, model: String, price: Float, personId: ID): Car
    // Update a car by id
    updateCar: (_root, args) => {
      // Find the car by id
      const car = find(cars, { id: args.id });
      if (!car) {
        throw new Error(`Car with id ${args.id} not found`);
      }
      // Additional validations:
      // 1. Ensure that the personId exists if provided
      if (args.personId) {
        const personExists = find(people, { id: args.personId });
        if (!personExists) {
          throw new Error(`Person with id ${args.personId} not found`);
        }
      }
      // 2. Price validation: Ensure price is a positive number if provided
      if (args.price && args.price <= 0) {
        throw new Error(`Price must be a positive amount`);
      } 
      // Note: Year, make, model are not validated here, but validation could be added as needed

      // Update car's data if provided
      car.year = args.year || car.year;
      car.make = args.make || car.make;
      car.model = args.model || car.model;
      car.price = args.price || car.price; 
      car.personId = args.personId || car.personId;

      // Return the updated car object
      return car;
    },
    // ----------------------------------------------------
    // removeCar(id: ID!): Car
    // Remove a car by id
    removeCar: (_root, args) => {
      // Find the car to remove by id
      const removedCar = find(cars, { id: args.id });
      if (!removedCar) {
        throw new Error(`Car with id ${args.id} not found`);
      }
      // Remove the car from the cars data and return the removed car object
      remove(cars, { id: args.id });
      return removedCar;
    },

  }
};

export { resolvers };
