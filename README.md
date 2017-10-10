![soon_ logo](https://user-images.githubusercontent.com/20629455/28109490-27c0b602-66e7-11e7-9918-578beb7dfa9d.png)
![screen shot 2017-07-12 at 09 52 39](https://user-images.githubusercontent.com/20629455/28109776-2833e306-66e8-11e7-86d6-b285d08b3cb1.png)

___
<br>

# Stand-ups Visualisation CLI

A extreamly simple and crude [Inquirer](https://www.npmjs.com/package/aglio) based interactive command line interface for saving morning stand-ups to a database via requests to a stand-up web API.

This project was used as a learning tool for interactive command line intefaces.

### Local Setup

#### 1. install dependencies

```shell
$ npm i
```

#### 2. run app

```shell
$ cd stand-up-visualisation-cli
$ node app.js
```

Runs the app with the defualt stand-up API address `http://localhost:3000/v1`

### Configuration

Configuration options and their node environment variables are detailed below (these can also be found in `config/config.js`).

* api: `process.env.API`

