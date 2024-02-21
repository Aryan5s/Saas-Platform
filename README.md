## Description 
- This is a SaaS Platform that enables user to make their communities and add members to it.
- Each user, can create a community and (automatically) gets assigned the Community Admin role. They can add other users to the community who get assigned the Community Member role.

# Features 
- Authentication
 ```
 User should be able to signup using valid name, email and strong password.
 User should be able to signin using valid credentials.
```

- Community
```
 User should be able to see all communities.
 User should be able to create a community.
```

- Moderation
```
 User should be able to see all community members.
 User should be able to add a user as member.
 User should be able to remove a member from community.
```

## Tech Stack 
- Language: Node v14+
- Framework: Express
- Database: MySql
- ORM: Sequelize
- Library(ID): @theinternetfolks/snowflake

## ER Diagram 
- Link to ER Diagram : https://drive.google.com/file/d/1CDH1UqrIa4AmeYVs9enu1rpyW6Oq9OMG/view?usp=sharing

## Run the Project 
- Clone Repository
```
git clone https://github.com/Aryan5s/Saas-Platform.git
```

- Open in your preffered IDE and type in the terminal
```
cd tif
```
- Now you're inside the directory, install the dependencies using
```
npm install
```

- Create a dotenv (.env) file and add the Environment Variables
```
PORT = YOUR_PORT_NUMBER
JWT_SECRET_KEY = 'YOUR_JWT_SECRET_KEY'
DATABASE_NAME = 'YOUR_DATABASE_NAME'
DATABASE_USER = 'YOUR_DATABASE_USER' 
DATABASE_PASSWORD = 'YOUR_DATABASE_PASSWORD'
DATABASE_HOST = 'YOUR_DATABASE_HOST'
DATABASE_PORT = 'YOUR_DATABASE_PORT'
```

- Type the following command to start the server
```
npm start
```
Your server will start at the Port mentioned in the dotenv file.

## Base URL 
```
http://localhost:4000/v1
```
- Note : This is with respect to my choice of port number which was 4000, you can choose a port accordingly.
