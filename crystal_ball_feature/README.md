# Comprehensive Design Overview for Crystal Ball Feature

## Feature Requirements Recap
1. **Daily Question for Women**: Randomly selected question from a pool.
2. **Responses for Men**: Answers to seven onboarding questions that influence profile delivery.
3. **Dynamic Question Pool Management**: Ability to add or remove questions in the future.

## 1. Architecture Design

### High-Level Architecture
1. ***Microservices Architecture***: Each functionality (user management, question management, response handling) will be encapsulated in separate microservices.
2. ***API Gateway***: Acts as a single entry point for all client requests, routing them to appropriate services (e.g., Reverse Proxy with NGINX).
3. ***Database Layer***: NoSQL database (e.g., MongoDB) for unstructured data like user responses.
4. ***Message Queue***: Implement a message broker (e.g., RabbitMQ) for asynchronous processing of user interactions.

### Deployment Strategy
1. ***Containerization***: Use Docker to containerize microservices for consistent deployment across environments.
2. ***Orchestration***: Utilize Kubernetes for managing containerized applications, ensuring scaling and load balancing.
3. ***CI/CD Pipeline***: Implement Continuous Integration/Continuous Deployment (CI/CD) using tools like GitHub Actions for automated testing and deployment.

## 2. Backend Design

### Data Models
#### 1. User Model
```json
{
  "userId": "string",
  "gender": "string",
  "responses": [
    {
      "questionId": "string",
      "answer": "string"
    }
  ],
  "profileType": "string"
}
```
#### 2. Question Model
```json
{
  "questionId": "string",
  "content": "string",
  "videoUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### 2. Response Model
```json
{
  "responseId": "string",
  "userId": "string",
  "questionId": "string",
  "answer": "string",
  "createdAt": "date"
}
```
### API Endpoints

### For Women
#### 1. Get Daily Question
**Endpoint**: GET /api/daily-question/women
**Response**:
```json
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

### Deployment Strategy
#### Automated Deployment Pipeline
1. Code is pushed to the repository.
2. CI/CD pipeline triggers automated tests.
3. Upon successful tests, Docker images are built and pushed to a container registry.
4. Kubernetes deploys updated containers automatically based on defined configurations.

#### Monitoring and Logging
Implement monitoring tools (e.g., Prometheus, Grafana) for real-time performance tracking.

### Testing Strategy
#### Testing Environment
Create staging environments that mirror production setups to conduct thorough testing before deployment.

#### Automated Testing
Implement test driven development with unit tests, integration tests, and end-to-end tests using frameworks like Jest or Cypress to ensure reliability across the application.


3. ## Scalability Considerations
### Scaling
**Horizontal Scaling**: Add more instances of microservices behind the API gateway as user load increases.

### Load Balancing
**Implement load balancers**: Use Nginx or AWS ELB to distribute incoming traffic evenly across service instances.

### Caching Layer
**Response Data** : Use Redis to cache frequently accessed data (e.g., questions, user profiles) to reduce database load.
**Static Data Access** : Use AWS S3 bucket with Amazon CLoudfront(CDN) to cache static files locally based on the users region.


