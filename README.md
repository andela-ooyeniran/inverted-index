[![Build Status](https://travis-ci.org/andela-ooyeniran/inverted-index.svg?branch=master)](https://travis-ci.org/andela-ooyeniran/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-ooyeniran/inverted-index/badge.svg?branch=master)](https://coveralls.io/github/andela-ooyeniran/inverted-index?branch=master)
[![Code Climate](https://codeclimate.com/github/andela-ooyeniran/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-ooyeniran/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-ooyeniran/inverted-index/badge.svg)](https://coveralls.io/github/andela-ooyeniran/inverted-index)
# inverted-index

### Introduction
An application that takes in a JSON array of text objects and creates an index from the array allowing users to search for words contained in the array.

### Key Features

- Upload of JSON file in below format.
```sh
[
    {"title": "Heroku",
    "text":"You will be asked to enter your Heroku credentials the first time you run a command; after the first time, your email address and an API token will be saved"
    },
    {"title": "Coveralls",
    "text": "See the latest code-coverage statistics on all of your repositories including the total percentages covered and the lines covered."
    }
]
```
- Creates Index of all documents with title and text keys in uploaded file.
- Searching of indexed files.

### How to use the APP
##### For Web use
Available via heroku hosted platform on : https://inverted-index-otoloye.herokuapp.com
##### Local Machine
git clone https://github.com/andela-ooyeniran/inverted-index.git

##### Change directory into inverted-index and follow the steps below.
- Install all the dependencies (you must have installed Nodejs):
```sh
npm install
```
- Run Tests for the application with:
```sh
npm test
```
- Start the Application with:
```sh
npm start
```
### Technologies
- Node.js
- EchmaScript 6 (JavaScript 2015)
- Angular.js

