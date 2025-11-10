# EchoDash Monorepo

EchoDash is a **music dashboard application**.
The project uses a **monorepo structure**, but backend and frontend are **independent projects**; they only share Git.

## Structure

```
echodash/
├─ echodash-backend/      # Backend API (Node.js + Express + TypeScript + Mongodb)
├─ echodash-frontend/     # Frontend dashboard (React + Vite + TypeScript + Redux-toolkit + Redux-saga)
└─ README.md              # This file
```

## Notes

* Backend and frontend have **separate dependencies and scripts**.
* Each has its own `.env` file.
* Root folder **does not contain a package.json**.
* Use Git at the root to clone, commit, and push the repository.
