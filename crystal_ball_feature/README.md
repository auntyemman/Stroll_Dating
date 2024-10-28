# Comprehensive Design Overview for Crystal Ball Feature

## Feature Requirements Recap
1. **Daily Question for Women**: Randomly selected question from a pool.
2. **Responses for Men**: Answers to seven onboarding questions that influence profile delivery.
3. **Dynamic Question Pool Management**: Ability to add or remove questions in the future.

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
