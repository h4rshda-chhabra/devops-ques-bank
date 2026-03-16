# DevOps Interview Question Bank

A full-stack platform for students and professionals to prepare for DevOps interviews. Browse, search, and contribute questions across various categories and difficulties.

## Project Structure
- **frontend/**: Next.js application built with React and Tailwind CSS.
- **backend/**: Node.js + Express REST API integrated with MongoDB.
- **docker/**: Containerization configurations.
- **Legay Mockups**: `legacy_mockups/` contains initial designs.

## Features
- **Browse by Category**: Filter questions by topics like Docker, Kubernetes, etc.
- **Search & Advanced Filters**: Search by keyword or filter by **Company** (Amazon, Google, etc.).
- **Professional Dataset**: Pre-seeded with 20 real-world DevOps interview questions.
- **Difficulty Levels**: Categorized into Easy, Medium, and Hard.
- **Community Contributions**: Submit your own questions with company and tag metadata.
- **Detailed Answers**: View in-depth answers and explanations for each question.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Lucide React (for icons).
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.
- **DevOps**: Docker, Docker Compose, GitHub Actions.

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### Running with Docker (Recommended)
You can easily start the entire environment from the root directory:
   ```bash
   docker-compose up --build -d
   ```
2. The frontend will be available at `http://localhost:3000`.
3. The backend API will be available at `http://localhost:4000/api`.

### Running Locally
1. **Backend**:
   ```bash
   cd backend
   npm install
3. **Seed Database**:
   ```bash
   npm run seed
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## CI/CD
The project includes a GitHub Actions workflow located in `.github/workflows/ci.yml` that automatically builds and verifies the code on every push to the `main` branch.
