<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Question Rotation System

## Overview

This project implements a **Dynamic Question Assignment System** that assigns questions to users based on their region and a configurable cycle duration. The system rotates questions weekly by default (configurable) to ensure that users in different regions receive their specific questions at the start of each new cycle.

The architecture is optimized for high scalability and efficient background processing to handle 100,000+ Daily Active Users (DAU) and potential expansion to millions of global users.

## Task Overview

### Requirements
- **Design & Implementation**: Create a system that dynamically assigns questions based on region and configurable cycles.
- **Writeup**: Explain the strategy, design, and scalability considerations.
- **Scalability Requirement**: The system must support 100k DAU and millions of global users efficiently.

---

## Design and Architecture

### High-Level Design

This design is focused on modularity, scalability, and resilience. The architecture leverages a queue-based system using Bull (a Redis-based job queue) to ensure reliable background processing of question assignments, with a cron job set up for automatic question rotation.

Key features include:
- **Region-based Question Assignment**: Each region has a unique set of questions, assigned to users in cycles (default: 7 days).
- **Configurable Cycle Duration**: The cycle duration (e.g., daily, weekly) is configurable through environment variables.
- **Cron Job and Bull Queue**: Cron jobs manage the automatic question rotation, using Bull queues for task scheduling and job management.

### Technology Stack

1. **NestJS**: A Node.js framework used for structuring the backend with modularity and scalability in mind.
2. **Bull Queue + Redis**: Manages job queues, allowing background tasks to scale effectively and ensuring resilience through retries and task monitoring.
3. **MongoDB**: A NoSQL database for storing questions, users, and cycle information. MongoDB is ideal for its scalability, and its JSON-based structure fits well with this application.
4. **@nestjs/schedule**: Cron jobs schedule the question rotation at specific intervals, with flexibility in configuring these schedules as needed.
5. **Bull-Board**: Used for queue monitoring and job management.

### Unused Technologies and Rationale

- **SQL Database**: Not used, as NoSQL (MongoDB) is more flexible for document-based, non-relational data, and for storing region-based question lists with complex structures.
- **Kafka or RabbitMQ**: Not used due to Bull's integration with Redis, which is sufficient for handling the queuing needs and managing job processing efficiently without the complexity of a message broker.
- **Heavy Monitoring Tools (e.g., Prometheus, Grafana)**: Currently not included but could be added as the project scales further. The design accommodates additional monitoring and alerting services if needed.

---

## Low-Level Design

### 1. **Question Rotation Algorithm**

- **Region-Based Round-Robin Rotation**: Each region has a separate list of questions, rotated according to the cycle:
  - Example: `Singapore [1, 2, 3]`, `US [6, 7, 8]`
  - Cycle 1: Week 1 assigns question `1` for Singapore and `6` for the US.
  - Cycle 2: Week 2 assigns question `2` for Singapore and `7` for the US.

### 2. **Cron Job Execution**

- The cron job triggers every Monday at **7 PM SGT** (configurable) using `@Cron` decorator with Bull for queuing. It calls the `CycleService` to determine the next question in the cycle, ensuring that questions are assigned at the correct time.
- **Flexible Scheduling**: Configurable via environment variables, allowing flexibility if the cycle duration needs to change.

### 3. **Queue Management with Bull**

- **Redis + Bull**: Manages tasks with retry and scheduling capabilities. Redis handles the queue storage, and Bull provides job management, including failure handling and retry logic.
- **Bull-Board**: A web-based interface for tracking job status, queue metrics, and managing job performance.

### 4. **Database and Caching**

- **MongoDB**: Stores questions, user data, and cycle information with sharding capabilities to support high data volume and maintain efficient reads/writes.
- **Redis**: Used for queue management, caching, and could also extend to store temporary user state to reduce MongoDB load further.

---

## Scalability and Performance

- **100k DAU Support**: By using Bull queues with Redis and MongoDB's sharding, the system is built to handle a high number of users efficiently.
- **Scalability to Millions of Users**: MongoDB’s sharding ensures data distribution across nodes, allowing horizontal scaling. Redis-backed Bull queues handle asynchronous processing, with retries and task distribution for high-volume operations.
- **Decoupling via Queue Management**: Queue-based processing separates question assignment tasks from the main application logic, minimizing load on the application server and making it easier to scale.

### Pros and Cons of the Design

#### Pros
- **Modular and Scalable**: The architecture is highly modular, allowing individual services to scale independently.
- **Configurable Cycles**: Easily adjustable cycle duration, making it flexible to business needs.
- **Fault-Tolerant**: Bull’s retry mechanism ensures tasks are retried on failure, preventing data inconsistency.
- **Resilient Data Storage**: MongoDB’s sharding and Redis' in-memory data handling make this architecture suitable for high throughput.

#### Cons
- **Latency in Queue Processing**: Queue-based processing can introduce latency, although mitigated by Bull’s optimized task scheduling.
- **Regional Expansion Complexity**: As more regions are added, managing different question cycles for each region could add complexity, requiring careful handling of data and task load.

---

## Future Improvements

1. **Advanced Monitoring**: Implement tools like **Prometheus** and **Grafana** for deeper insights into system performance.
2. **Cache Layer Expansion**: Additional caching mechanisms (e.g., Redis for user states) to reduce database load.
3. **Notification System**: Send alerts to users when a new question is available.
4. **Region-Specific Customization**: Allow more granular region control over question cycles and rotation settings.

---

## Getting Started

1. **Clone the Repository**: 
   ```bash
   git clone <repository-link>
   cd question-rotation-system


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


