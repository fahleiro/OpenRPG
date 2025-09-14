## Core Server
The server contains a simple configuration based on `.env`

### Server Configuration
- HOST: IP address where the server will run
- PORT: PORT the server will use to listen for requests
```
# Run server configuration
SERVER_HOST=
SERVER_PORT=

# Firebase configuration
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```

**Note**: Copy `.env.example` to `.env` and fill in the actual values for your Firebase project