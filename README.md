# Full Stack Open

My solutions and notes while completing the [Full Stack Open](https://fullstackopen.com/en/) course from the University of Helsinki.

> **Status:** In Progress

---

## About this repository

This repository is a structured learning journey through the complete Full Stack Open course (Parts 0–14).

I already have previous professional experience with programming and software development, including web applications, databases, SQL, and related technologies. Therefore, some concepts covered in the course are not new to me.

Nevertheless, I intend to **complete all exercises in all parts of the course** rather than skipping topics based on prior experience. The purpose is to build a systematic understanding of the modern React and full-stack ecosystem, identify gaps in my existing knowledge, and become comfortable with the conventions, tools, and practices used by the current JavaScript/TypeScript ecosystem.

### How I use this repository

The exercises are intentionally my own implementations. I may use external documentation and assistance for:

* Boilerplate and project scaffolding
* Environment and tooling setup
* Repetitive configuration
* Troubleshooting infrastructure or tooling issues
* Other tasks where the goal is to save time rather than bypass the learning objective

The goal is therefore not simply to complete the course, but to use the exercises as deliberate practice while leveraging my existing experience where appropriate.

---

## Course

**Full Stack Open: Deep Dive Into Modern Web Development**

Course website: https://fullstackopen.com/en/

The course focuses primarily on building single-page applications with React and REST APIs with Node.js, while progressively covering the broader full-stack ecosystem.

---

## Repository structure

Each course part is kept in its own directory:

```text
part0/
part1/
part2/
...
part14/
```

Applications and exercise sets are organized underneath their corresponding part.

The repository intentionally follows the structure recommended by the course so that the exercises remain easy to identify and submit.

---

## Progress

### Core course

* [x] **Part 0: Fundamentals of Web apps**

  * HTML
  * CSS
  * JavaScript
  * HTTP
  * REST
  * SPA concepts
  * Browser/server communication
  * Exercises 0.1–0.6

* [x] **Part 1: Introduction to React**

  * React basics
  * JSX
  * Components
  * Props
  * State
  * Event handling
  * Component composition
  * Exercises

* [x] **Part 2: Communicating with server**

  * Rendering collections
  * Forms
  * Getting data from servers
  * Sending data to servers
  * Axios
  * REST APIs
  * Exercises


* [x] **Part 3: Programming a server with NodeJS and Express**

  * Node.js
  * Express
  * REST APIs
  * Middleware
  * MongoDB
  * Mongoose
  * Deployment
  * Exercises

* [x] **Part 4: Testing Express servers, user administration**

  * Backend testing
  * Jest
  * Supertest
  * Token authentication
  * User administration
  * MongoDB
  * Exercises

* [x] **Part 5: Testing React apps**

  * React testing
  * Component testing
  * End-to-end testing
  * Playwright
  * React Router
  * UI libraries
  * Styled components
  * Exercises

* [ ] **Part 6: Advanced state management `NEXT`**

  * Flux architecture
  * Redux
  * Zustand
  * React Query / server state
  * Exercises

* [ ] **Part 7: React router, custom hooks and more `PLANNED`**

  * Custom hooks
  * Vite
  * esbuild
  * Error boundaries
  * Code organization
  * Class components
  * Exercises

<!--
### Extensions

* [ ] **Part 8: GraphQL**

  * GraphQL
  * Apollo Server
  * Apollo Client
  * Queries and mutations
  * Subscriptions
  * Exercises

* [ ] **Part 9: TypeScript**

  * TypeScript fundamentals
  * Typing React applications
  * Typing Node.js applications
  * Full-stack TypeScript
  * Exercises

* [ ] **Part 10: React Native**

  * React Native
  * Expo
  * Mobile application development
  * Navigation
  * GraphQL
  * Exercises

* [ ] **Part 11: CI/CD**

  * Continuous integration
  * Continuous delivery
  * GitHub Actions
  * Automated testing
  * Deployment pipelines
  * Exercises

* [ ] **Part 12: Containers**

  * Docker
  * Containerization
  * Docker Compose
  * Production environments
  * Exercises

* [ ] **Part 13: Using relational databases**

  * PostgreSQL
  * Relational data modeling
  * SQL
  * Sequelize
  * Prisma
  * Exercises

* [ ] **Part 14: Next.js**

  * Next.js
  * Server-side rendering
  * Full-stack Next.js applications
  * Modern React architecture
  * Exercises
-->

---

## Learning log

This section records significant milestones, concepts, and implementation decisions as I progress through the course.

The intention is **not** to duplicate the course material, but to keep a concise record of what I have actually practiced and learned.

### 2026-09-09 – Repository initialized

* Repository created.
* Full Stack Open Parts 0–14 identified as the target scope.
* Started Part 0.

### 2026-09-10 – Part 0 completed

* Completed and submitted Part 0: Fundamentals of Web apps.
* Reviewed the foundations of web development, HTTP, REST, and browser/server communication.

### 2026-09-17 – Part 1 completed

* Completed exercises 1.1–1.14.
* Built initial React applications and practiced JSX, components, props, state, event handling, and component composition.
* Developed a better understanding of React's declarative approach to building user interfaces.

### 2026-09-22 – Part 2 completed

* Completed exercises 2.1–2.20.
* Practiced rendering collections, handling forms, managing application state, and communicating with external services.
* Implemented client-server communication using Axios and REST APIs.
* Worked with asynchronous operations and data fetching.

### 2026-09-28 – Part 3 completed

* Completed exercises 3.1–3.22.
* Developed backend applications using Node.js and Express.
* Implemented REST endpoints, middleware, request validation, and error handling.
* Integrated MongoDB using Mongoose.
* Worked with deployment and documented API testing using Bruno.

### 2026-10 – Travel break

* Took a break from the course while traveling through Italy and the Balkans.
* Resumed Part 4 afterward.

### 2026-11-06 – Part 4 completed

* Completed exercises 4.1–4.23.
* Implemented automated backend tests using Node's test runner and Supertest.
* Practiced database setup and test isolation.
* Implemented user administration, password hashing, and token-based authentication.
* Extended the Bloglist backend with user relationships, authorization, and protected operations.
* Worked with MongoDB document relationships and Mongoose population.

### 2026-11-19 – Part 5 completed

* Completed exercises 5.1–5.31.
* Extended the Bloglist application with a React frontend.
* Implemented authentication, application routing, component composition, and shared state management.
* Practiced component testing with React Testing Library and user-event.
* Implemented end-to-end tests with Playwright, covering authentication, blog creation, liking, deletion, and ownership restrictions.
* Explored asynchronous UI behavior and reliable E2E test synchronization.
* Refined the interface using Material UI components.

### Next: Part 6 – State Management

* The course has moved to a separate platform: [Full Stack Open – State Management](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management).
* Created an account on the new platform.
* Coursework and exercises not yet started.

---

## Learning approach

### Learn before abstracting

The primary goal is understanding the technologies and concepts rather than producing production-grade abstractions from the beginning.

### Prefer the course structure

Exercise solutions should remain recognizable and easy to map to the corresponding Full Stack Open exercises.

### Small, incremental changes

Changes should generally follow the course's incremental approach: implement a small change, verify that it works, then move forward.

### Keep experiments visible

When useful, experiments and intermediate implementations may remain in the repository if they help document the learning process.

### Don't hide the learning process

Not every implementation needs to represent how I would architect a production system. The repository is primarily a learning record.

---

## Environment

Primary development environment:

* macOS
* Git
* Node.js
* npm
* Visual Studio Code
* Chrome / Firefox Developer Edition

Versions and tooling may evolve as required by the course.

---

## Completion criteria

The repository will be considered complete when:

* [ ] Parts 0–14 have been studied.
* [ ] Required exercises have been implemented.
* [ ] Exercise submissions have been completed where applicable.
* [ ] Applications run successfully in their final state.
* [ ] Tests pass where applicable.
* [ ] The repository contains no accidentally committed dependencies, credentials, secrets, build artifacts, or local environment files.
* [ ] The learning log has been updated with the major milestones.

---

## Notes

Full Stack Open is continuously updated rather than being tied to a yearly version. Exercise implementations may therefore reflect the versions and instructions current when they were completed.

This repository contains my own exercise solutions and learning work. The course material itself remains the property of its respective authors and is used according to its license.
