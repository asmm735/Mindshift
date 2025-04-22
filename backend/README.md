# Mindshiftt Backend

## Setup and Run

1. Navigate to the backend directory:
   \`\`\`
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Start the server:
   \`\`\`
   npm start
   \`\`\`

The backend server will run on http://localhost:3001

## API

### POST /login

Request body:
\`\`\`json
{
  "username": "user",
  "password": "password"
}
\`\`\`

Response:
- Success: 200 OK with JSON \`{ "token": "jwt_token_here" }\`
- Failure: 401 Unauthorized with JSON \`{ "message": "Invalid username or password." }\`
