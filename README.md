# Description

Presentation website for a company.

# Tech Stack

- Runtime: Node.js
- Framework: Next.js
- Database: -
- Language: TypeScript
- Security: CSRF, input validation (powered by Zod)
- Logging: -
- Containerization: Docker
- Testing: -

# Characteristics

- [x] Best Practices: Clean architecture, TypeScript, error handling, async patterns, DRY, SOLID, KISS
- [x] Security: input validation, CORS
- [x] Request validation (powered by Zod)
- [x] Internationalization / language management (powered by i18next)
- [x] Development environment available (Docker)

# Features

### Core features

- [x] home
- [x] resources
- [x] contact
- 
# Setup

### 1. Add `hosts` record
For configuration refer to this guide:  
[How to Edit the Host File on macOS](https://phoenixnap.com/kb/mac-hosts-file)

### 2. Initialize Docker container
Start the Docker container using the following command:

```
docker compose up
```

### 3. Connect to the Docker container
Once the container is running, connect to it with:

```
docker exec -it wellawork.test/bin/bash
```

### 4. Install dependencies inside the container
Run the following command to install project dependencies:

```
$ pnpm install
```

### 5. Update .env

Start by copying the `.env.example` file to `.env` and update the environment variables accordingly.

### 6. Run the application

```
$ pnpm run dev
```

# Commands


```bash

// Code sanity
$ pnpm run biome
$ pnpm run madge

```

# TODO

1.  CI/CD