# Comprehensive Design Overview for Crystal Ball Feature

## Feature Requirements Recap
1. **Daily Question for Women**: Randomly selected question from a pool.
2. **Responses for Men**: Answers to seven onboarding questions that influence profile delivery.
3. **Dynamic Question Pool Management**: Ability to add or remove questions in the future.

## 1. Architecture Design

### High-Level Architecture
***Microservices Architecture***: Each functionality (user management, question management, response handling) will be encapsulated in separate microservices.
***API Gateway***: Acts as a single entry point for all client requests, routing them to appropriate services (e.g., Reverse Proxy with NGINX).
***Database Layer***: NoSQL database (e.g., MongoDB) for unstructured data like user responses.
***Message Queue***: Implement a message broker (e.g., RabbitMQ) for asynchronous processing of user interactions.

### Deployment Strategy
***Containerization***: Use Docker to containerize microservices for consistent deployment across environments.
***Orchestration***: Utilize Kubernetes for managing containerized applications, ensuring scaling and load balancing.
***CI/CD Pipeline***: Implement Continuous Integration/Continuous Deployment (CI/CD) using tools like GitHub Actions for automated testing and deployment.

## Backend Design
## Data Models

### 1. User Model
```json
{
  "userId": "string",
  "gender": "string", // "male" or "female"
  "responses": [
    {
      "questionId": "string",
      "answer": "string"
    }
  ],
  "profileType": "string" // A, B, IDK
}
```
### 2. Question Model
```json
{
  "questionId": "string",
  "content": "string",
  "videoUrl": "string", // URL to the looping HD video
  "createdAt": "date",
  "updatedAt": "date"
}
```

### 2. Response Model
```json
{
  "responseId": "string",
  "userId": "string",
  "questionId": "string",
  "answer": "string",
  "createdAt": "date"
}
```
## API Endpoints
### For Women

#### 1. Get Daily Question
**Endpoint**: GET /api/daily-question/women
**Response**:
```json
json
{
  "questionId": "string",
  "content": "string",
  "videoUrl": "string"
}
```
#### 2. Submit Response
**Endpoint**: POST /api/response/women
**Response**:
```json
{
  "userId": "string",
  "questionId": "string",
  "answer": "A/B/IDK"
}
```

### For Men
#### Onboard User
**Endpoint**: POST /api/onboard/men
**Request** Body:
```json
json
{
  "userId": "string",
  "responses": [
    {
      "questionId": "string",
      "answer": "string"
    }
  ]
}
```

### For Product Team

#### 1. Add New Question
**Endpoint**: POST /api/admin/questions
**Response**:
```json
{
  "content": "string",
  "videoUrl": "string"
}
```
#### 2. Remove Question
**Endpoint**: DELETE /api/admin/questions/{questionId}

#### 3. Update Question
**Endpoint**: PUT /api/admin/questions/{questionId}
**Response**:
```json
{
  "content": "string",
  "videoUrl": "string"
}
```

