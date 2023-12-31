# Angular SPA Project

This is a Single Page Application (SPA) built with Angular. The project is hosted on GitHub and contains various components and services to implement the functionality of the application.

![](https://github.com/viktor-dimitrov/angular-spa/blob/main/angular-spa/src/assets/images/mockup.png?raw=true)

## You can access the deployed application [here](https://viktor-dimitrov.github.io/angular-spa).

 

## Project Structure

The project has the following directory structure:

- `/src`: The main source directory of the Angular application.
  - `/app`: Contains the core components and services of the application.
    - `/core`: Directory for core module.
      - `/footer`
      - `/guards`
      - `/header`
      - `/not-found`
      - `core.module.ts`
    - `/records`: Directory for components and services related to records.
      - `/catalog`
      - `/comments`
      - `/edit-record`
      - `/post-record`
      - `/record`
      - `record-routing.module.ts`
      - `record.module.ts`
      - `record.service.spec.ts`
      - `record.service.ts`
    - `/shared`: Directory for shared components, services, or utilities.
      - `/interceptors`
      - `/loader`
      - `/types`
      - `/validators`
    - `/user`: Directory for components and services related to users.
      - `/login`
      - `/profile`
      - `/register`
      - `user-routing.module.ts`
      - `user.module.ts`
      - `user.service.spec.ts`
      - `user.service.ts`
    - `/assets`: Directory for application assets.
    - `/images`: Contains image resources used in the application.
    - `/environments`: Directory for environment configuration files.
    - `app-routing.module.ts`: Routing configuration for the application.
    - `app.component.css`: Stylesheet for the root component.
    - `app.component.html`: HTML template for the root component.
    - `app.component.spec.ts`: Component testing specification.
    - `app.component.ts`: TypeScript file for the root component.
    - `app.module.ts`: Application module configuration.


## Components

### Records Component

The "Records" component is responsible for displaying and managing records in the application. It allows users to view, create, update, and delete records. The component communicates with the `RecordService` to perform CRUD operations on records.

### User Component

The "User" component handles user-related functionality. It may include user profile details, login, registration, and other user-specific features. The component interacts with the `UserService` to manage user-related data and operations.

## Services

### Record Service

The `RecordService` is an Angular service responsible for handling data related to records. It communicates with an external API (defined in the `apiUrl` variable) to fetch records, create new records, update existing ones, and delete records. The service returns data to the components through Observables using HttpClient.

### User Service

The `UserService` is another Angular service responsible for managing user-related data and actions. It interacts with an external API (defined in the `apiUrl` variable) to perform operations such as user login, user registration, and retrieval of user details. Like the `RecordService`, this service also uses HttpClient to communicate with the backend API.

## Routing

The project uses Angular's routing module to navigate between different components and display the appropriate views based on the user's actions. Each module typically has its routing module to define the routes specific to that module.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/viktor-dimitrov/angular-spa.git`
2. Navigate to the project directory: `cd angular-spa`
3. Install the dependencies for Angular frontend: `cd angular-spa && npm install`
4. Start the Angular development server: `ng serve`
5. **Clone and Configure the Express Server:**
   - Clone the Express server repository: `git clone https://github.com/viktor-dimitrov/NodeJS-Cyclic-MongoDB.git`
   - Navigate to the Express server directory: `cd NodeJS-Cyclic-MongoDB`
   - Install the dependencies for the Express server: `npm install`
   - Configure the Express server (e.g., set up MongoDB connection and other required configurations).
   - Start the Express server: `npm start`
6. **Configure Angular Environment:**
   - In the `src/environments` directory, you'll find the `environment.ts` file. This file contains environment-specific settings.
   - Update the `apiUrl` variable in `environment.ts` to match the URL of your Express backend server. For example:
     ```
     apiUrl: 'http://localhost:3000'
     ```


Now, both the Angular frontend and Express backend server should be up and running. You can access the application in your web browser by going to `http://localhost:4200/`.

Please make sure to follow the instructions in the Express server repository to properly configure the server before starting it. This may include setting up environment variables, database connection, and other server-specific configurations.


Happy coding!