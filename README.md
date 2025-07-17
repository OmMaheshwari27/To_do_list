📋 Task Manager REST API

A simple and secure task manager RESTful API built with Node.js, Express, and MongoDB. Users can register, log in, and manage their tasks (create, read, update, delete).

⸻

📌 Features
	•	User authentication using JWT
	•	CRUD operations for personal tasks
	•	Protected routes (only accessible by logged-in users)
	•	MongoDB database integration
	•	Clean and modular folder structure

⸻


## 📁 API Endpoints

### 🔐 Authentication
| Method | Route     | Description             |
|--------|-----------|-------------------------|
| POST   | `/signup` | Register a new user     |
| POST   | `/login`  | Login existing user     |
| GET    | `/logout` | Logout current user     |

### ✅ Task Routes (Protected)
| Method | Route         | Description            |
|--------|---------------|------------------------|
| POST   | `/tasks`      | Create a new task      |
| GET    | `/tasks`      | Fetch all tasks        |
| GET    | `/tasks/:id`  | Fetch a task by ID     |
| PUT    | `/tasks/:id`  | Update task status     |
| DELETE | `/tasks/:id`  | Delete task by ID      |

---

🚀 Getting Started

✅ Prerequisites
	•	Node.js (v16 or higher)
	•	MongoDB Atlas account (or local MongoDB)
	•	Git (optional)

⸻

⚙️ Installation & Running the Project

1. Clone the Repository

git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api

2. Install Dependencies

npm install

## 📦 Additional Dependencies

| Package         | Purpose                           |
|----------------|-----------------------------------|
| express         | Web framework                     |
| mongoose        | MongoDB object modeling           |
| jsonwebtoken    | JWT token creation & verification |
| bcryptjs        | Password hashing                  |
| cookie-parser   | Cookie parsing middleware         |
| dotenv          | Environment variable handling     |
| nodemon (dev)   | Auto-reload server during dev     |


3. Set Up Environment Variables

Create a .env file in the root directory:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskdb
JWT_SECRET=your_jwt_secret_key

4. Start the Server

node src/app.js

🔗 Server will run on: http://localhost:8000

⸻

📁 Folder Structure

<pre>
```bash
to-do-list/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── taskdb.js
│   │   └── user.js
│   ├── routers/
│   │   ├── auth.js
│   │   └── task.js
│   ├── middlewares/
│   │   └── auth.js
│   └── utils/
├── .env
├── package.json
├── README.md
```
</pre>


⸻
