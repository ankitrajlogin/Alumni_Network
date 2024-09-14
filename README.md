
# Directory Structure:

```
frontend/
│
├── components/
│   ├── Dashboard.js
│   ├── Login.js
│   ├── LoginSignup.js
│   ├── Navbar.js
│   └── Signup.js
│
├── pages/
│   ├── BlogPage.js
│   └── Landing.js
│
├── App.js
├── index.js
└── main.js

backend/
|
├── controllers/
│   └── authController.js       # Authentication logic (signup, login)
│   └── postController.js       # Logic for handling posts (create, read, update, delete)
├── middlewares/
|   └── Auth.js                 # Middleware for checking authentication (JWT)
│   └── authValidation.js       # Check online and Signup Validation 
├── models/
│   └── User.js                 # User schema (MongoDB schema for users)
│   └── Post.js                 # Post schema (MongoDB schema for posts)
├── routes/
│   └── authRoutes.js           # Authentication routes (login, signup) and also Routes for managing posts (create, update, delete and show all posts
├── .env                        # Environment variables (DB URL, JWT secret)
├── index.js                   # Entry point (Server setup and configuration)
└── package.json                # Project metadata and dependencies



```
