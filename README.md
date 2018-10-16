# MobyDQ
[![CircleCI](https://circleci.com/gh/mobydq/mobydq/tree/master.svg?style=shield)][CircleCI]

 [CircleCI]: https://circleci.com/gh/mobydq/mobydq/tree/master (CircleCI)

**MobyDQ** is a tool for data engineering teams to automate data quality checks on their data pipeline, capture data quality issues and trigger alerts in case of anomaly, regardless of the data sources they use.

![Data pipeline](https://mobydq.github.io/img/data_pipeline.png)

This tool has been inspired by an internal project developed at <a href="https://www.ubisoft.com">Ubisoft Entertainment</a> in order to measure and improve the data quality of its Enterprise Data Platform. However, this open source version has been reworked to improve its design, simplify it and remove technical dependencies with commercial software.


# Getting Started
Skip the bla bla and run your data quality indicators by following the [Getting Started page](https://mobydq.github.io/gettingstarted/). The complete documentation is also available on Github Pages: [https://mobydq.github.io](https://mobydq.github.io).


# Requirements

## Install Docker
This tool has been fully containerized with Docker to ensure easy deployment and portability. To add the Docker repository to your Linux machine, execute the following commands in a terminal window.
```shell
$ sudo apt-get update
$ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

Install Docker Community Edition.
```shell
$ sudo apt-get update
$ sudo apt-get install docker-ce
```

Add your user to the docker group to setup its permissions. **Make sure to restart your machine after executing this command.**
```shell
$ sudo usermod -a -G docker <username>
```


## Install Docker Compose
Execute the following command in a terminal window.
```shell
$ sudo apt install docker-compose
```


# Setup Your Instance
## Create Public and Private Keys
Public and private keys are required for your instance of MobyDQ to sign JSON Web Tokens (JWT). The JWT is used for bla bla bla. Create the keys in the root of the repository:

```shell
$ cd mobydq
$ openssl genrsa -out private.pem 2048 && openssl rsa -in private.pem -pubout > public.pem
```

## Authentication
MobyDQ delegates account creation and authentication management to major third parties such as Google or Github. Authentication is managed using **OAuth2** protocol so you should create an OAuth app on the website of the provider you want to use:
* [Github](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app)
* [Google](https://console.cloud.google.com/apis/credentials)

Notes:
* **Authorized redirect URIs** should contain the URI indicated in the `.env` file below.
* **Client ID** and **Client Secret** should be provided in the `.env` file below.

## Create Configuration Files
Based on the template below, create a text file named `.env` at the root of the project. This file is used by Docker Compose to load configuration parameters into environment variables. This is typically used to manage file paths, logins, passwords, etc. Make sure to update the `postgres` user password for both `POSTGRES_PASSWORD` and `DATABASE_URL` parameters. Also make sure to update the values for the OAuth providers.

```ini
# DB
# Parameters used by db container
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# GRAPHQL
DATABASE_URL=postgres://postgres:password@db:5432/mobydq

# SCRIPTS
# Parameters used by scripts container
GRAPHQL_URL=http://graphql:5433/graphql
MAIL_HOST=smtp.server.org
MAIL_PORT=25
MAIL_SENDER=change@me.com

# APP
# Parameters used by app container
NODE_ENV=development
REACT_APP_FLASK_API_URL=http://localhost:5434/mobydq/api/v1/

# OAUTH
# Global OAuth parameters used by web app
TOKEN_ISSUER=https://localhost
AFTER_LOGIN_REDIRECT=http://localhost

# GITHUB
# Github OAuth parameters
GITHUB_CLIENT_ID=change_me
GITHUB_CLIENT_SECRET=change_me
GITHUB_REDIRECT_URI=http://localhost:5434/mobydq/api/v1/security/oauth/github/callback

# GOOGLE
# Google OAuth parameters
GOOGLE_CLIENT_ID=change_me
GOOGLE_CLIENT_SECRET=change_me
GOOGLE_REDIRECT_URI=http://localhost:5434/mobydq/api/v1/security/oauth/google/callback
```


## Create Docker Network
This custom network is used to connect the different containers between each others. It is used in particular to connect the ephemeral containers ran when executing batches of indicators.
```shell
$ docker network create mobydq-network
```


## Create Docker Volume
Due to Docker compatibility issues on Windows machines, we recommend to manually create a Docker volume instead of directly mounting external folders in `docker-compose.yml`. This volume will be used to persist the data stored in the PostgreSQL database. Execute the following command.
```shell
$ docker volume create mobydq-db-volume
```


## Build Docker Images
Go to the project root and execute the following command in your terminal window.
```shell
$ cd mobydq
$ docker-compose build --no-cache
```


## Run Docker Containers
To start all the Docker containers as daemons, go to the project root and execute the following command in your terminal window.
```shell
$ cd mobydq
$ docker-compose up -d db graphql api app
```

Individual components can be accessed at the following addresses:
* Web application: `http://localhost`
* Flask API Swagger Documentation: `http://localhost:5434/mobydq/api/doc`
* GraphiQL Documentation: `http://localhost:5433/graphiql`
* PostgreSQL database `host: localhost, port: 5432`

Note access to GraphiQL and the PostgreSQL database is restricted by default to avoid intrusions. In order to access these addresses directly, you must run them with the following command to open their ports:
```shell
$ cd mobydq
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d db graphql
```

# Run Tests
You can run all tests locally using the following commands:
```shell
 $ # Backend
 $ test/run-tests.sh
 $ # Frontend
 $ app/run-container.sh npm run test
```

# Run Linter
Depending on the used editor, eslint and pylint can be integrated.
You can run all linters locally using the following commands:
```shell
 $ # Backend
 $ test/run-linter.sh
 $ # Frontend
 $ app/run-container.sh npm run lint
```


---


# Dependencies
## Docker Images
The containers run by `docker-compose` have dependencies with the following Docker images:
* [postgres](https://hub.docker.com/_/postgres/) (tag: 10.4-alpine)
* [graphile/postgraphile](https://hub.docker.com/r/graphile/postgraphile/) (tag: latest)
* [python](https://hub.docker.com/_/python/) (tag: 3.6.6-alpine3.8)
* [python](https://hub.docker.com/_/python/) (tag: 3.6.6-slim-stretch)


## Python Packages
* [docker](https://docker-py.readthedocs.io) (3.5.0)
* [flask](http://flask.pocoo.org) (1.0.2)
* [flask_restplus](https://flask-restplus.readthedocs.io) (0.11.0)
* [flask_cors](https://flask-cors.readthedocs.io) (3.0.6)
* [graphql_py](https://pypi.org/project/graphql-py) (0.7.1)
* [jinja2](http://jinja.pocoo.org) (2.10.0)
* [numpy](http://www.numpy.org) (1.14.0)
* [pandas](https://pandas.pydata.org) (0.23.0)
* [pyodbc](https://github.com/mkleehammer/pyodbc) (4.0.23)
* [requests](http://docs.python-requests.org) (2.19.1)
