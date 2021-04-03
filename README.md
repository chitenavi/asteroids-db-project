<h1 align="center">Welcome to asteroids-db-project 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Api for manage asteroids and users. Developed under Node and MongoDB

## Install

First download project from github, and then:

```sh
npm install
```

## Configure environment variables

Copy .env.example to .env and edit your settings before first run.

```sh
cp .env.example .env
```

## Usage

You have the possibility to initialize the database with asteroids read from a csv file:

```sh
npm run initdb
```

For start app in developmnent run:

```sh
npm run dev
```

For production run:

```sh
npm run build
npm run start
```

## API Routes

Use jwt for autorization
Authorization header. "Bearer <token>"

### Users

#### POST http://localhost:3000/api/v1/users/auth

Auth user. Login. Body parameters (email, password)

#### GET http://localhost:3000/api/v1/users/all

List all users. Require auth header

#### POST http://localhost:3000/api/v1/users/all

Create list of users. Pass json array (Raw). Require auth header

#### POST http://localhost:3000/api/v1/users

Create user. Signup. Body parameters (username, email, password, passwordConf)

#### GET http://localhost:3000/api/v1/users/:id

Get user by id. Require auth header

#### PUT http://localhost:3000/api/v1/users/:id

Update user by id. Require auth header

#### DELETE http://localhost:3000/api/v1/users/:id

Delete user by id. Require auth header

### Asteroids

#### GET http://localhost:3000/api/v1/neas/all

List all asteroids. Require auth header

#### POST http://localhost:3000/api/v1/neas/all

Create list of asteroids. Pass json array (Raw). Require auth header

#### POST http://localhost:3000/api/v1/neas

Create asteroid. Body parameters (full_name, a, e, i, om, w, ma). Require auth header

#### GET http://localhost:3000/api/v1/neas/:id

Get asteroid by id. Require auth header

#### PUT http://localhost:3000/api/v1/neas/:id

Update asteroid by id. Require auth header

#### DELETE http://localhost:3000/api/v1/neas/:id

Delete asteroid by id. Require auth header

## Author

👤 **Ivan Chinea**

- Github: [@chitenavi](https://github.com/chitenavi)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
