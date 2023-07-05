# Node-Express-Sequelize-API Boilerplate <!-- omit in toc -->

Simple boilerplate code base for creating APIs with `Node.js Express` framework using `Sequelize` with `PostgreSQL` database.

## 📚 Contents <!-- omit in toc -->

- [Includes](#includes)
- [Prerequisite](#prerequisite)
- [Getting Started](#getting-started)
- [Local Setup](#local-setup)
- [Tests \& Coverage](#tests--coverage)
- [Migrations](#migrations)
- [Environment Variables](#environment-variables)
- [`ESDoc`](#esdoc)
- [Endpoints](#endpoints)
- [References](#references)

## Includes

- **ES6** `import/export` implemented with `type: "module"` in `package.json`
- **Error handling** middlewares implemented
- `Tests` added with `mocha` configuration
- Code-coverage using Node.js' built in functionality `c8`
- `Eslint`
- `winston` logger

## 😊 Prerequisite

- Install `nodemon` globally using below command if not installed already

  ```sh
  npm i -g nodemon
  ```

- **PostgreSQL**

## 🚀 Getting Started

You can download or clone this repo using below command:

```sh
git clone git@github.com:Chetan07j/node-pg-sequelize.git
```

## ⚙️ Local Setup

- After cloning enter into folder.
- Install dependencies

  ```sh
  npm install
  ```

- Create file called `.env`
- Copy `.env.example` file content `.env` file.

- Run locally

  ```sh
  npm run local
  ```

## 🧪 Tests & Coverage

- Run tests *(unit/integration)*

  ```sh
  npm test
  ```

- Run tests with coverage

  ```sh
  npm run coverage
  ```

## 🗃️ Migrations

- Running Migrations

  ```sh
  npm run migration
  ```

- Undoing Migrations

  ```sh
  npm run migration:undo
  ```

## ℹ️ Environment Variables

| Variable | Description              | Default Value |
| -------- | ------------------------ | ------------- |
| DB_HOST  | Database connection host | `localhost`   |
| DB_PORT  | Database port            | `5432`        |
| DB_NAME  | Database name            | `postgres`    |
| DB_USER  | Database username        | `postgres`    |
| DB_PASS  | Database password        | `postgres`    |

> NOTE: These environment variables are already passed to `npm run local` and `npm test` scripts under `package.json` with their default values. You can update as per your need.

## 🗒️ `ESDoc`

- Documention is created out of comments added for functions using `esdoc`.
- That documentaion is avaialbe as GH Pages site, can be found [here](https://chetan07j.github.io/node-pg-sequelize-boilerplate/).

## ✴️ Endpoints

<!-- Create User with Skills -->
<details>
    <summary>Create User with Skills</summary>

  ```sh
  curl --location --request POST 'localhost:3000/v1/users' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "firstName": "Chetan",
      "lastName": "Patil",
      "gender": "Male",
      "skills": [
          {
              "name": "Node.js",
              "proficiency": "Advanced"
          }
      ]
  }'
  ```

</details>

<!-- Get all `Users` -->
<details>
    <summary>Get all Users</summary>

    ```sh
    # Request
    
    curl --location --request GET 'localhost:3000/v1/users'

    #Response

    {
      "success": true,
      "body": [
        {
          "id": 1,
          "firstName": "First1",
          "lastName": "Last",
          "gender": "Male",
          "createdAt": "2022-03-20T10:11:41.860Z",
          "updatedAt": "2022-03-20T10:11:41.860Z",
          "skills": [
            {
              "id": 1,
              "userId": 1,
              "name": "Node.js",
              "proficiency": "Advanced",
              "createdAt": "2022-03-20T10:11:41.867Z",
              "updatedAt": "2022-03-20T10:11:41.867Z"
            }
          ]
        }
      ]
    }

    ```

</details>

<!-- Get specific `User` by `userId` -->
<details>
    <summary>Get specific User by userId</summary>

    ```sh
    # Request

    curl --location --request GET 'localhost:3000/v1/users/1'

    # Response

    {
      "success": true,
      "body": {
        "id": 1,
        "firstName": "Chetan",
        "lastName": "Patil",
        "gender": "Male",
        "createdAt": "2022-03-20T20:39:17.912Z",
        "updatedAt": "2022-03-20T20:39:17.912Z",
        "skills": [
          {
            "id": 1,
            "userId": 1,
            "name": "Node.js",
            "proficiency": "Advanced",
            "createdAt": "2022-03-20T20:39:17.962Z",
            "updatedAt": "2022-03-20T20:39:17.962Z"
          }
        ]
      }
    }
    ```
</details>

## 📚 References

- [Sequelize ORM](https://sequelize.org/v6/)

## 🤗 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have a way to improve this project.

Make sure your request is meaningful and you have tested the app locally before submitting a pull request.

## 🙋‍♂️ Support

💙 If you like this project, give it a ⭐
