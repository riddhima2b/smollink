URL shortener 

# Snipppy - Simply Redirect 🔗

A full-stack URL shortener built on the PERN stack (PostgreSQL, Express, React, Node.js), with custom slugs, click analytics, and cookie-based authentication.

**Live:** https://www.snipppy.com/

---

## Features

- **Base62 short code generation** for compact, collision-resistant short links
- **Custom slug support** — pick your own short code instead of a generated one
- **JWT authentication** via httpOnly cookies for secure session handling
- **My Links dashboard** — view, and track all links created by a user

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Frontend       | React                                |
| Backend        | Node.js, Express                     |
| Database       | PostgreSQL                           |
| ORM            | Prisma                               |
| Auth           | JWT (httpOnly cookies)               |
| Deployment     | AWS EC2 (Ubuntu), Nginx, PM2         |

---

## Project Structure

```
snippy/
├── frontend/          # React frontend
├── backend/          # Express backend
│   ├── prisma/       # Prisma schema & migrations
│   ├── controllers/
│   ├── routes/
│   └── middleware/
└── README.md
```

---
