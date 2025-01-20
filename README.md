## Requirements

1. Install docker.
2. Install docker compose. (Newer versions of docker come with the compose command in-built)
3. Replace <PROJECT_ID> in docker-compose.yaml with the project id from the Project Owner. Do not commit this change.

## Conditional Requirements

1. Install google cloud sdk on your local machine
2. Authenticate with your credentials using

```bash
$ gcloud auth application-default login
```

3. The credentials will be saved in your home folder(LINUX)

## Guidelines

- All PRs lead to develop, so this should ALWAYS be your starting point
- More PRs > One Big PR

## Installation

```bash
$ npm install
```

## Running the app

Running the app for the first time requires

```bash
$ docker-compose up --build
```

for subsequent runs you can use

```bash
$ docker-compose up
```

## Accessing the database

The docker compose contains a commented out pgadmin service. Uncomment this and restart the containers to spin up pgadmin.
It will be accessible on http://localhost:5050 with the provided credentials on the container definition.

# Interacting with the API
The API endpoints are defined on postman and the link can be found [here](https://api.postman.com/collections/5305865-9ace42ff-92fc-468c-b18c-ac09cb60bb16?access_key=PMAT-01JJ2ABZ9HX8YSWJ4ENTBA54EQ)
