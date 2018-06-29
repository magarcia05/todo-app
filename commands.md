## Commands to install MongoDB
* sudo apt-get install -y mongodb-org
* mkdir data
* npm install mongoose --save
* echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
* chmod a+x mongod
* ./mongod

## Commands for nodemon
nodemon index.js

## Commands for Heroku
Basic Commands to Initialize Heroku on Application
* heroku create
* git push heroku master
* heroku ps:scale web=1
* heroku open

To Check for Logs
* heroku open

For More Information
* https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction