# BestAppEver2026

## Overview

BestAppEver2026 is a monorepo containing a modern web application stack. It's designed to be a scalable and maintainable foundation for new projects.

This repository includes:

*   **`apps/web`**: A [Next.js](https://nextjs.org/) frontend.
*   **`apps/api`**: A [NestJS](https://nestjs.com/) backend API.
*   **`apps/docs`**: A [Docusaurus](https://docusaurus.io/) documentation site.
*   **`packages/db`**: [Prisma](https://www.prisma.io/) schema, client, and seeding for the database.
*   **`packages/ui`**: A stub for a shared React component library.
*   **`packages/auth`**: A stub for a shared authentication library.
*   **`packages/utils`**: A stub for shared utility functions.
*   **`packages/eslint-config-custom`**: Shared ESLint configuration.
*   **`packages/tsconfig`**: Shared TypeScript configurations.

## Architecture

This project is a monorepo using [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/repo).

*   **Frontend:** A Next.js application responsible for the user interface.
*   **Backend:** A NestJS API that handles business logic and data access.
*   **Database:** PostgreSQL is used for persistent data storage, managed by Prisma.
*   **Tooling:**
    *   **pnpm** for package management.
    *   **Turborepo** for monorepo build orchestration.
    *   **TypeScript** for static typing across the stack.
    *   **ESLint** and **Prettier** for code quality and formatting.
    *   **Docker** for containerizing services like the database.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [pnpm](https://pnpm.io/installation)
*   [Docker](https://www.docker.com/get-started/) and Docker Compose

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/example/bestappever2026.git
    cd bestappever2026
    ```

2.  **Install dependencies:**

    Install all dependencies from the root of the monorepo.

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Copy the example environment file to create your own local configuration.

    ```bash
    cp .env.example .env
    ```

    Review the `.env` file and update the variables as needed, especially `DATABASE_URL`. The default value should work with the provided Docker Compose setup.

4.  **Start backing services:**

    This will start a PostgreSQL database instance using Docker.

    ```bash
    docker-compose up -d
    ```

5.  **Run database migrations:**

    This will apply the database schema to your PostgreSQL instance.

    ```bash
    pnpm --filter @bestappever2026/db db:migrate:dev
    ```

6.  **(Optional) Seed the database:**

    To populate the database with some initial data, run the seed script.

    ```bash
    pnpm --filter @bestappever2026/db db:seed
    ```

### Running the Application

To run all applications (web, api, docs) in development mode simultaneously:

```bash
pnpm dev
```

This command will start:
*   The Next.js frontend on `http://localhost:3000`
*   The NestJS backend on `http://localhost:3001`
*   The Docusaurus docs site on `http://localhost:3002` (or the next available port)

You can also run a specific application by filtering:

```bash
# Run only the web frontend
pnpm --filter @bestappever2026/web dev

# Run only the backend API
pnpm --filter @bestappever2026/api dev
```

## Available Scripts

Here are some of the most common scripts available in the root `package.json`:

*   `pnpm dev`: Starts all applications in development mode.
*   `pnpm build`: Builds all applications for production.
*   `pnpm lint`: Lints the entire codebase.
*   `pnpm test`: Runs tests across the monorepo.

Individual packages have their own scripts which you can explore in their respective `package.json` files.