Mongodb Setup - Execute the command in terminal 

Import the public key used by the package management system
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

Create a list file for MongoDB
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

Reload the local package database
sudo apt-get update

Install the MongoDB packages
sudo apt-get install -y mongodb-org

Start MongoDB
sudo service mongod start

Download the package: (ui for mongodb)
https://downloads.mongodb.com/compass/mongodb-compass_1.15.1_amd64.deb;

Install Compass:
sudo dpkg -i mongodb-compass_1.15.1_amd64.deb;

Start Compass:
mongodb-compass;

Database creation in Mongodb 

Create Database - signup
Create Collection - client

Click the Insert document in mongodb - insert the value
	fullName - string
    	projectName - string
	email - string
	password - string
	type_user - string
	value_flag - boolean     


Run the project in Angular (Front End)

Install Angular cli 
sudo npm install -g @angular/cli

Run the angular code
ng serve

Run the project in Nodejs (Black End)

Install nodejs
sudo apt install nodejs

Run the nodejs code
npm start 

