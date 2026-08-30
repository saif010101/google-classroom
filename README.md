# Overview

This is a web application is inspired by the Google Classroom. I built it to get an idea about how Google may have designed it, most importantly the database schema. This project does not have all the functionalites that Google Classroom has and is a minimal version of it. 

# Technology Stack
- React.js with Typescript for Frontend.
- TanStack Query for async management.
- Node.js with Express.js for REST API.
- PostgreSQL for the database.
- AWS S3 for file storage

# Database Schema
![Database Schema Image](images/schema.png)

# Screenshots

![Database Schema Image](images/login.png)
![Login Page Desktop](images/home-screen-with-sidebar-mobile.png)
![Database Schema Image](images/class-page-mobile.png)

# How to setup for local development

Clone the repository then follow the instructions below.

### .env file example
```
ORIGIN=localhost
ORIGIN_PORT=5173
PORT=3000
JWT_SECRET_KEY=
DATABASE_URL=postgresql://myuser:mypassword@172.19.0.3:5432/mydb
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_BUCKET_NAME=
NODE_ENV=development
GEMINI_API_KEY=
GEMINI_MODEL=
```

For some of the features you will need AWS and Gemini account to get relevant keys.

### Database setup
- Download postgres database engine for your operating system or use postgres docker image.
- Create a .env file inside the 'backend' folder and put your database credentials


### Backend setup

```
cd google-classroom
cd backend
npm install
npm run migrate up 
nodemon
```

### Frontend setup


```
cd google-classroom
cd frontend
npm install
npm run dev
```





Then go to the web browser and type `http://localhost:5173` and you should see the application running.

# Sample login credentials

Email : `alice@example.com`  
Password `password123`




