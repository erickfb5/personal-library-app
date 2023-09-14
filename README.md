# **[Personal Library App](https://personal-library-ld4b.onrender.com)**

A full-stack JavaScript application for managing your personal library. You can add new books, add comments to books, view book details, and delete books from your library. This application is built using [Node.js](https://nodejs.org/en/about), [Express.js](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/).

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new books to your library.
- Add comments to existing books.
- View book details and comments.
- Delete books from your library.

## File Structure
The application's file structure includes the following **key** files and directories:

- ```config/dbConn.js```: Module for handling the connection to a MongoDB database.
- ```controllers/```: Controllers for handling API requests.
- ```middlewares/logger.js```: Function responsible for logging incoming HTTP requests.
- ```models/```: Database models.
- ```routes/```: Defines the API routes for handling HTTP requests related to issues and projects.
- ```tests/functional_tests.js```: Contains a series of functional tests that were written using the [**Mocha**](https://mochajs.org/) testing framework and the [**Chai**](https://www.chaijs.com/) assertion library
- ```server.js```: Main entry point of the application. It is responsible for setting up and configuring the [**Express.js**](https://expressjs.com/) server, defining routes, and starting the server.

## Installation
To run the [Personal Library App](https://personal-library-ld4b.onrender.com) locally, follow these steps:
1. Clone this repository to your local machine using:
    ```bash
    git clone https://github.com/erickfb5/personal-library-app.git
2. Navigate to the project directory:
   ```bash
   cd personal-library-app
3. Install the required dependencies:
   ```bash
   npm install
4. Rename the `sample.env` file to `.env` and update the required environment variables.   
5. Start the server:
   ```bash
   npm start
## Usage
Once the server is running, you can use the [Personal Library App](https://personal-library-ld4b.onrender.com) by opening your web browser and navigating to the **http://localhost:```PORT```/** defined in the ```.env``` file.

## Technologies Used
The [Personal Library App](https://personal-library-ld4b.onrender.com) utilizes the technologies and dependencies listed below to deliver its functionality:

- [Node.js](https://nodejs.org/en/about)
- [Express.js](https://expressjs.com)
- [Mongoose](https://mongoosejs.com/)
- [Chai](https://www.chaijs.com/)
- [Date-fns](https://date-fns.org)

## Testing
The application includes a comprehensive testing suite with _functional_ tests:

 These tests check the overall functionality of the API by making HTTP requests to various endpoints and verifying the responses. The functional tests are defined in ```tests/functional-tests.js```.

To run the tests, you can use the following command: **```npm test```**

## Contributing
If you would like to contribute to this project, please follow these guidelines:

- Fork the repository on GitHub.
- Make your changes and commit them to your fork.
- Create a pull request from your fork to this repository. 

# License
This project is licensed under the **[MIT License](https://spdx.org/licenses/MIT.html)**.