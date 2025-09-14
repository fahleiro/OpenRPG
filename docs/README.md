## About
OpenRPG is a self-hosted npm package, open-source backend for RPGs, developed in TypeScript and built as a REST API

## Key Features
- **TypeScript** – Used in the backend server
- **Express.js** – Web framework that handles routes and server logic
- **RESTful API** – Endpoints to expose server features
- **JSON Database** – Simple database in JSON format
- **Configurable CORS** – Controls which clients can access the API securely

## Core Server
The server contains a simple configuration based on `server.conf`:
- HOST: IP address where the server will run
- PORT: PORT the server will use to listen for requests
```
# Run server configuration
SERVER_HOST=localhost
SERVER_PORT=3000
```