# Chat-Server

A high-performance, real-time chat server built with Node.js, Express, MongoDB, Redis, TypeScript, and Socket.io.

# Features

- Real-time messaging with WebSocket (via Socket.io)
- Scalable architecture with Redis for handling message queues
- TypeScript support for type-safe development
- MongoDB integration for persistent data storage
- Modular and organized codebase for easy maintenance

# Technologies

- Node.js: Server runtime
- Express: Web application framework for Node.js
- MongoDB: Database for storing user and chat data
- Redis: Cache and message broker for efficient real-time data handling
- Socket.io: WebSocket implementation for real-time communication
- TypeScript: Typed JavaScript for safer, more robust code

# Getting Started
## Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (>= 16.x)
- MongoDB
- Redis

# Installation
1. Clone the repository:
git clone https://github.com/your-username/chat-server.git
cd chat-server

2.Install dependencies:
yarn install

3.Configure Environment Variables:
Set up the required environment variables in your .env file or environment configuration files. Refer to config/custom-environment-variables.ts for details.
MONGO_URI=mongodb://localhost:27017/chatdb
REDIS_URL=redis://localhost:6379
PORT=3000

# Running the Application
For Local Development:
yarn dev



  
