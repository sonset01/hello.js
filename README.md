# Week 2 – Node & Express API (BeTechified)

A simple Express API built for the Backend Development Week 2 assignment.

## Setup

```bash
npm install express dotenv
cp .env.example .env   # PORT=3000
npm start
```

## Endpoints

| Method | Route       | Description                                              |
|--------|-------------|----------------------------------------------------------|
| GET    | `/`         | "My Week 2 API!" (curl/Postman); static HTML page in a browser |
| POST   | `/user`     | Body `{"name","email"}` → `Hello, [name]!` (400 if missing) |
| GET    | `/user/:id` | `User [id] profile`                                      |

## Test with curl

```bash
curl http://localhost:3000/
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Success","email":"s@x.com"}'
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Success"}'   # 400
curl http://localhost:3000/user/42
```

Every request is logged by a custom middleware (bonus).
