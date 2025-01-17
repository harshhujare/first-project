System Design Architecture
1. Overview of the Architecture
The system will consist of three main layers:

Frontend Layer:

Technologies: HTML, CSS, JavaScript
Purpose:
User Interface (UI) for users to interact with the application.
Responsible for rendering room listings, handling user input, and calling APIs for backend communication.
Examples of Features:
Search functionality (by location, price, etc.)
Listing form for users to add room details.
Backend Layer:

Technologies: Node.js and Express.js
Purpose:
Handle business logic.
Provide APIs to serve room listings and manage user interactions.
Process room submissions (e.g., storing room details in the database).
Authenticate users (login, registration).
Database Layer:

Technologies: MySQL
Purpose:
Store and retrieve room listings.
Store user information (e.g., login credentials, favorites, etc.).
Efficient querying for filtered room listings.
2. High-Level Architecture Diagram
sql
Copy
Edit
+---------------------+
|     Frontend        |
|---------------------|
| HTML, CSS, JS       |
|                     |
| Room Listing Pages  |
| Search & Filters    |
| Room Submission Form|
+---------------------+
        |
        | (HTTP Requests via Fetch/Axios)
        v
+---------------------+
|     Backend         |
|---------------------|
| Node.js & Express.js|
|                     |
| REST API Endpoints: |
| - GET /rooms        |
| - GET /rooms/:id    |
| - POST /rooms       |
| - POST /auth/login  |
| - POST /auth/signup |
|                     |
| Middleware:         |
| - Data Validation   |
| - Authentication    |
+---------------------+
        |
        | (SQL Queries via Sequelize or MySQL Driver)
        v
+---------------------+
|     Database        |
|---------------------|
| MySQL               |
|                     |
| Tables:             |
| - Users             |
| - Rooms             |
| - Favorites         |
|                     |
| Relationships:      |
| - Users <-> Rooms   |
+---------------------+
3. Technology Stack
Here’s a detailed breakdown of the technologies being used in each layer:

Frontend
HTML: Structure the web pages (e.g., room listings, filters, submission forms).
CSS: Style the web pages (responsive design, grid layouts, animations).
JavaScript: Handle interactivity, make API calls, and dynamically render data.
Frontend Responsibilities:
Display room listings fetched from the backend.
Submit room details (via forms) to the backend.
Provide a search bar and filter functionality on the UI.
Call APIs using fetch or Axios.
Backend
Node.js: Server-side JavaScript runtime for building APIs.
Express.js: Lightweight framework for creating RESTful APIs.
Backend Responsibilities:
API Endpoints for:
Fetching room listings (GET /rooms, GET /rooms/:id).
Adding new rooms (POST /rooms).
User authentication (POST /auth/login, POST /auth/signup).
Middleware for:
Validating incoming data.
Authentication (JWT tokens for logged-in users).
Handling file uploads (e.g., room images).
Database communication using SQL queries.
Database
MySQL: Relational database to store structured data.
Database Responsibilities:
Store room data, user data, and their relationships.
Provide filtered data for search queries (e.g., rooms by location or price).
Efficiently manage large datasets with indexing.
4. Database Schema Design
Here’s a basic schema for the MySQL Database:

Users Table
Column Name	Data Type	Description
id	INT (Primary Key, Auto Increment)	Unique user ID.
name	VARCHAR(100)	User's name.
email	VARCHAR(150)	User's email (unique).
password	VARCHAR(255)	Encrypted password.
created_at	TIMESTAMP	Account creation date.
Rooms Table
Column Name	Data Type	Description
id	INT (Primary Key, Auto Increment)	Unique room ID.
title	VARCHAR(200)	Room title.
description	TEXT	Detailed description.
price	DECIMAL(10, 2)	Price per month.
location	VARCHAR(255)	Location or college name.
type	ENUM('Shared', 'Private', 'Studio')	Room type.
user_id	INT (Foreign Key)	ID of the user who listed the room.
created_at	TIMESTAMP	Room creation date.
Favorites Table (Optional)
Column Name	Data Type	Description
id	INT (Primary Key, Auto Increment)	Unique favorite ID.
user_id	INT (Foreign Key)	ID of the user.
room_id	INT (Foreign Key)	ID of the room.
5. API Endpoints
Here’s a list of endpoints you’ll create in the backend:

Room Management
Fetch All Rooms

Endpoint: GET /api/rooms
Purpose: Get a list of all room listings (with optional filters like price, location).
Response Example:
json
Copy
Edit
[
    {
        "id": 1,
        "title": "Shared Room near XYZ College",
        "price": 4500,
        "location": "XYZ College",
        "type": "Shared",
    }
]
Fetch Room by ID

Endpoint: GET /api/rooms/:id
Purpose: Fetch detailed information about a specific room.
Create New Room

Endpoint: POST /api/rooms
Purpose: Add a new room listing.
Request Example:
json
Copy
Edit
{
    "title": "Private Room near ABC College",
    "description": "A cozy private room near the college.",
    "price": 6500,
    "location": "ABC College",
    "type": "Private",
    "user_id": 1
}
Authentication
User Signup

Endpoint: POST /api/auth/signup
Purpose: Register a new user.
User Login

Endpoint: POST /api/auth/login
Purpose: Authenticate a user and return a JWT token.
6. System Workflow
User Workflow:

Users visit the website and see room listings on the homepage (fetched from GET /api/rooms).
Users can filter rooms by location, price, or type using the search bar (filtered in the frontend or via query parameters in the API).
Logged-in users can save rooms to their favorites.
Room Submission:

A logged-in user fills out a form to list a new room.
The frontend sends the form data to POST /api/rooms.
The backend saves the data in the MySQL database.
Map Integration:

The frontend fetches room data, including coordinates, from GET /api/rooms.
Google Maps or Leaflet.js displays the rooms as markers on a map.
Would you like help setting up any specific part of this architecture, such as creating the backend API or connecting to MySQL?
