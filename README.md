# X Clone

X Clone is a full-stack social media application inspired by popular platforms. It allows users to create posts, follow other users, like posts, comment, and receive notifications. The application is built using modern technologies like React, Node.js, Express, and MongoDB.

## Features

### Client-Side Features
- **Authentication**: Sign up, log in, and log out functionality.
- **Profile Management**: Update profile details, including profile and cover images.
- **Posts**: Create, like, comment, and delete posts.
- **Feed**: View posts from followed users or all users.
- **Notifications**: Receive notifications for likes and follows.
- **Suggested Users**: Get suggestions for users to follow.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Server-Side Features
- **Authentication**: Secure authentication using JWT and cookies.
- **User Management**: APIs for user profiles, following/unfollowing, and suggested users.
- **Post Management**: APIs for creating, liking, commenting, and deleting posts.
- **Notifications**: APIs for managing notifications.
- **Cloudinary Integration**: Upload and manage images for posts and profiles.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **React Query**: For data fetching and caching.
- **Tailwind CSS**: For styling.
- **DaisyUI**: For pre-styled components.
- **Vite**: For fast development and build tooling.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For building RESTful APIs.
- **MongoDB**: For database management.
- **Mongoose**: For MongoDB object modeling.
- **Cloudinary**: For image storage and management.
- **JWT**: For secure authentication.

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Cloudinary account for image uploads

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following:
   ```
   PORT=8000
   mongo_uri=<your_mongo_connection_string>
   jwt_secret=<your_jwt_secret>
   cloud_name=<your_cloudinary_cloud_name>
   api_key=<your_cloudinary_api_key>
   api_secret=<your_cloudinary_api_secret>
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:9000`.

## Folder Structure

```
x-clone/
├── client/               # Frontend code
│   ├── src/              # React application source code
│   ├── public/           # Static assets
│   ├── index.html        # Entry point for the frontend
│   └── vite.config.js    # Vite configuration
├── server/               # Backend code
│   ├── routes/           # API routes
│   ├── controller/       # Route handlers
│   ├── model/            # Mongoose models
│   ├── middleware/       # Middleware functions
│   ├── db/               # Database connection
│   ├── index.js          # Entry point for the backend
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## Scripts

### Backend
- `npm run dev`: Start the backend server in development mode.
- `npm start`: Start the backend server in production mode.

### Frontend
- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the frontend for production.
- `npm run preview`: Preview the production build.

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments
- Inspired by popular social media platforms.
- Built with love using modern web technologies.
