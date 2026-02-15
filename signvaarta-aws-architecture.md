# SignVaarta - AWS Architecture Diagram

## Architecture Overview

This document describes the AWS cloud architecture for the SignVaarta platform, an AI-powered Indian Sign Language (ISL) communication system.

## Architecture Layers

### 1. Client Layer
- **Mobile App**: Primary interface for DHH/mute users
- **Web Interface**: Browser-based access for wider reach

### 2. API Gateway Layer
- **AWS API Gateway**: 
  - RESTful API endpoints
  - WebSocket support for real-time communication
  - Request validation and throttling
  - CORS configuration for web clients

### 3. Orchestration Layer (AWS Lambda)

**Lambda: Session Manager**
- Manages user sessions and preferences
- Handles authentication and authorization
- Stores/retrieves user data from DynamoDB

**Lambda: ISL Pipeline Orchestrator**
- Coordinates the ISL-to-speech pipeline
- Manages data flow between AI services
- Handles error recovery and retries
- Manages conversation context in ElastiCache

**Lambda: Speech-to-Text Handler**
- Processes audio input from non-signers
- Invokes Amazon Transcribe
- Returns transcribed text to client

### 4. AI Processing Layer

**Computer Vision Service (SageMaker Endpoint)**
- Technology: MediaPipe Holistic + Custom CNN
- Function: Extract hand, face, and pose landmarks
- Input: Video frames (RGB images)
- Output: Normalized landmark sequences
- Model Storage: S3

**Gloss Generation Service (SageMaker Endpoint)**
- Technology: CNN-Transformer Hybrid
- Function: Convert landmarks to ISL gloss notation
- Input: Landmark sequences
- Output: ISL gloss tokens with confidence scores
- Model Storage: S3

**LLM Translation Service (AWS Bedrock)**
- Technology: Claude/Llama foundation models
- Function: Transform ISL gloss to natural language
- Input: ISL gloss + conversation context
- Output: Fluent natural language text
- Context: Retrieved from ElastiCache

**Text-to-Speech Service (Amazon Polly)**
- Technology: Neural TTS
- Function: Convert text to speech audio
- Supported Languages: English (Indian), Hindi, Tamil, Bengali, Telugu
- Output: MP3/WAV audio files

**Speech-to-Text Service (Amazon Transcribe)**
- Technology: Automatic Speech Recognition
- Function: Convert speech to text
- Supported Languages: Indian English, Hindi, and regional languages
- Output: Transcribed text with timestamps

**Learning Assessment Service (SageMaker Endpoint)**
- Technology: DTW + Similarity Scoring
- Function: Evaluate learner gestures vs reference
- Input: Learner landmarks + reference gesture
- Output: Assessment scores and feedback
- Model Storage: S3

### 5. Storage Layer

**Amazon S3**
- Model artifacts (CV, Gloss, Learning models)
- Reference gesture library
- Temporary video processing (auto-deleted)
- Training datasets (anonymized, with consent)

**Amazon DynamoDB**
- **UserPreferences Table**: User settings, language preferences
- **LearningProgress Table**: Gesture mastery levels, practice history
- **SessionData Table**: Temporary session data (TTL: 1 hour)
- Encryption: AES-256 at rest

**Amazon ElastiCache (Redis)**
- Conversation context (last 5-10 exchanges)
- Session state management
- Fast access for LLM context retrieval
- TTL: 1 hour for automatic cleanup

## Data Flow: ISL-to-Speech Pipeline

```
1. User performs ISL gestures → Mobile App captures video
2. Mobile App → API Gateway → ISL Pipeline Orchestrator Lambda
3. Lambda → Computer Vision (SageMaker) → Landmark extraction
4. Lambda → Gloss Generation (SageMaker) → ISL gloss notation
5. Lambda → ElastiCache → Store conversation context
6. Lambda → AWS Bedrock → Natural language translation
7. Lambda → Amazon Polly → Speech synthesis
8. Lambda → API Gateway → Mobile App
9. Mobile App → Display text + Play audio to user
```

## Data Flow: Speech-to-Text Pipeline

```
1. Non-signer speaks → Mobile App captures audio
2. Mobile App → API Gateway → STT Handler Lambda
3. Lambda → Amazon Transcribe → Text transcription
4. Lambda → API Gateway → Mobile App
5. Mobile App → Display text to DHH user
```

## Security & Privacy

- **TLS 1.2+**: All client-server communication encrypted
- **IAM Roles**: Least-privilege access for Lambda functions
- **VPC**: SageMaker endpoints in private subnets
- **Encryption**: DynamoDB encrypted at rest (AES-256)
- **Data Lifecycle**: Video/audio deleted after processing
- **Session TTL**: Automatic cleanup after 1 hour
- **Audit Logging**: CloudWatch Logs for all API calls

## Scalability Considerations

- **Lambda**: Auto-scales with concurrent requests
- **API Gateway**: Handles thousands of requests/second
- **SageMaker**: Auto-scaling endpoints based on load
- **DynamoDB**: On-demand capacity mode
- **ElastiCache**: Cluster mode for high availability
- **S3**: Unlimited storage, high durability

## Cost Optimization (Hackathon MVP)

- **Bedrock**: Pay-per-token pricing (no infrastructure)
- **Lambda**: Pay-per-invocation (no idle costs)
- **SageMaker**: Use ml.t3.medium for MVP (upgrade for production)
- **ElastiCache**: Single node for MVP (cluster for production)
- **DynamoDB**: On-demand mode (no capacity planning)

## Monitoring & Observability

- **CloudWatch Metrics**: Lambda duration, SageMaker latency, API Gateway errors
- **CloudWatch Logs**: Centralized logging for all services
- **X-Ray**: Distributed tracing for pipeline debugging
- **CloudWatch Alarms**: Alert on high error rates or latency

## Deployment Strategy

**Hackathon MVP**:
- Single AWS region (ap-south-1 Mumbai)
- Development environment only
- Manual deployment via AWS Console/CLI
- Simplified monitoring

**Production (Future)**:
- Multi-region deployment for low latency
- CI/CD pipeline with AWS CodePipeline
- Blue-green deployment for zero downtime
- Comprehensive monitoring and alerting
- Auto-scaling policies for all services

## AWS Services Summary

| Service | Purpose | Justification |
|---------|---------|---------------|
| API Gateway | API management | Serverless, auto-scaling, built-in throttling |
| Lambda | Orchestration | Serverless, pay-per-use, auto-scaling |
| SageMaker | ML model hosting | Managed infrastructure, auto-scaling endpoints |
| Bedrock | LLM access | No infrastructure, foundation models, pay-per-token |
| Polly | Text-to-Speech | Neural voices, Indian languages, managed service |
| Transcribe | Speech-to-Text | Indian accents, real-time, managed service |
| S3 | Object storage | Durable, scalable, cost-effective |
| DynamoDB | NoSQL database | Serverless, fast, auto-scaling |
| ElastiCache | In-memory cache | Fast context retrieval, session management |
| CloudWatch | Monitoring | Centralized logging, metrics, alarms |

## Architecture Diagram (Text Representation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐              ┌──────────────┐                 │
│  │  Mobile App  │              │ Web Interface│                 │
│  └──────┬───────┘              └──────┬───────┘                 │
└─────────┼──────────────────────────────┼──────────────────────────┘
          │                              │
          └──────────────┬───────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────────┐
│                    API GATEWAY LAYER                              │
│                  ┌──────────────────┐                            │
│                  │  AWS API Gateway │                            │
│                  └────────┬─────────┘                            │
└───────────────────────────┼───────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
┌─────────▼─────────────────▼─────────────────▼───────────────────┐
│                  ORCHESTRATION LAYER (Lambda)                     │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │ Session  │    │ ISL Pipeline │    │ STT Handler  │          │
│  │ Manager  │    │ Orchestrator │    │              │          │
│  └────┬─────┘    └──────┬───────┘    └──────┬───────┘          │
└───────┼─────────────────┼─────────────────────┼──────────────────┘
        │                 │                     │
        │                 │                     │
┌───────▼─────────────────▼─────────────────────▼──────────────────┐
│                    AI PROCESSING LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Computer    │→ │    Gloss     │→ │     LLM      │→         │
│  │   Vision     │  │  Generation  │  │ Translation  │          │
│  │ (SageMaker)  │  │ (SageMaker)  │  │  (Bedrock)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Polly     │  │  Transcribe  │  │  Learning    │          │
│  │    (TTS)     │  │    (STT)     │  │ Assessment   │          │
│  │              │  │              │  │ (SageMaker)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│                      STORAGE LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │      S3      │  │  DynamoDB    │  │ ElastiCache  │          │
│  │    Models    │  │  User Data   │  │   Session    │          │
│  │  Artifacts   │  │   Progress   │  │   Context    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────────────────────────────────────────────┘
```

## Notes

- This architecture is designed for the AWS AI for Bharat Hackathon
- MVP focuses on core ISL-to-speech functionality
- Production deployment would include additional services (CloudFront, WAF, etc.)
- All AI services are justified by the complexity of ISL linguistic processing
- Privacy-first design: no permanent storage of video/audio data
