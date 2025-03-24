# Task Management Application

This application allows users to manage their tasks efficiently. Users can create, update, delete, and list their tasks. The application ensures that users can only manage their own tasks and provides a simple and intuitive interface for task management.

## Features

- **User Authentication**: Secure user authentication with session management.
- **Task Management**: Create, update, delete, and list tasks.
- **Task Filtering**: Filter tasks by completion status and title.
- **Task Limits**: Restrict the number of tasks a user can create.
- **Pagination**: Paginate task lists for better usability.

## Getting Started

### Prerequisites

- Node.js
- npm, yarn, pnpm
- A database (e.g., PostgreSQL, MySQL, SQLite)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/mohitxskull/Task.git
   cd Task
   ```

2. **Install dependencies**:
   ```sh
   pnpm install
   ```

3. **Configure the application**:
   - Copy the `.env.example` file to `.env` and update the environment variables as needed.
   - Ensure your database is set up and the connection details are correct in the `.env` file.

4. **Start the application**:
   ```sh
   pnpm run dev
   ```

### API Endpoints

#### Authentication

- **Sign In**: `POST /api/v1/auth/sign-in`
- **Sign Up**: `POST /api/v1/auth/sign-up`
- **Sign Out**: `POST /api/v1/auth/sign-out`
- **Session**: `GET /api/v1/auth/session`
- **Verify**: `POST /api/v1/auth/verify`
- **Update Password**: `PUT /api/v1/auth/password`
- **Update Profile**: `PUT /api/v1/auth/profile`

#### Task Management

- **List Tasks**: `GET /api/v1/task`
- **Show Task**: `GET /api/v1/task/:taskId`
- **Create Task**: `POST /api/v1/task`
- **Update Task**: `PUT /api/v1/task/:taskId`
- **Delete Task**: `DELETE /api/v1/task/:taskId`

### Middleware

- **Authentication Middleware**: Ensures that routes are accessible only to authenticated users.
- **Throttling Middleware**: Limits the number of requests to prevent abuse.
- **Captcha Middleware**: Protects against automated sign-ups and sign-ins.

### Error Handling

The application uses custom exceptions to handle errors gracefully. If a route is not found, a `ProcessingException` with a `NOT_FOUND` status is thrown.