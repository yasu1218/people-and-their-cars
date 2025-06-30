# People And Their Cars

A simple web app built with Apollo, GraphQL, Express.js and React.js to manage list of persons and the cars each person owns. 

---

## Features

- to be updated

---

## Getting Started

### Prerequisites

- Node.js (must be v20 LTS as of June 2025)
- npm or yarn

### Installation with nvm

```bash
# Clone the repo
git clone https://github.com/yasu1218/people-and-their-cars.git
cd people-and-their-cars

# Downgrade Node.js to 20 LTS (if needed)
nvm install 20
nvm use 20

# Install dependencies for server side
cd server
npm install
```

### Start the app with nvm

#### Backend server

```bash
# Start server
cd server
nvm start
```

#### Frontend client

```bash
# To be updated
```

### Access the app

- Access backend [Apollo Studio](http://localhost:4000)
- Access frontend [main page](http://localhost:3000)

---

## Project Structure

```
/client
  /src
    /components               # Reusable UI components
      /buttons                # Button components
      /forms                  # Input form components
      /layout                 # Layouts
      /listItems              # List item (card) components
      /lists                  # List components
    /graphql                  # GraphQL queries
    App.css                   # General styles
    App.js                    # Client application
/server
  /src
    peopleCarsResolvers.js    # Resolver for GraphQL
    peopleCarsScheme.js       # Initial set of person and car data
    peopleCarsTypeDefs.js     # Typedefs for GraphQL
  server.js                   # server application
```

---

## Future Improvements

- To be updated

---

## Acknowledgments

- UI components by [Ant Design](https://ant.design/)
- **Special thanks to [@paulhklam1122](https://github.com/paulhklam1122)** for teaching Apollo + GraphQL concepts and guiding the development of this app as part of a learning project.
