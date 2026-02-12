# 🌐 SignVaarta  
**AI-powered Indian Sign Language to Speech Communication Platform**
**Original concept and architecture developed by Team TheCodeHers for AWS AI for Bharat 2026.**

---

## 🧩 What is SignVaarta?

**SignVaarta** is an AI-powered communication and learning platform that enables **meaningful, real-time communication between Indian Sign Language (ISL) users and non-signers**.

Unlike conventional sign-language tools that rely on static dictionaries or word-by-word mapping, SignVaarta treats **ISL as a complete visual–spatial language**. It preserves ISL grammar using **gloss-based representation** and applies AI-driven language modeling to generate **fluent natural-language text and speech**.

This project is developed for the **AWS AI for Bharat Hackathon**, under the theme  
**AI for Communities, Access & Public Impact**.

---

## 🎯 Why this problem matters

In India, millions of Deaf & Hard-of-Hearing (DHH) and mute individuals depend on ISL for communication. However:

- ISL is not understood by most of the population  
- ISL grammar differs fundamentally from spoken languages  
- Existing tools translate signs as isolated words, losing meaning  
- Communication barriers persist in education, healthcare, and public services  

This limits independence, inclusion, and access to essential opportunities.

---

## 💡 Our Core Idea (What makes SignVaarta different)

**ISL is not gestures → it is a language.**  
SignVaarta is built around this principle.

### Linguistically aware pipeline:
![alt text](image-1.png)


### Key design choices:
- **Gloss as an intermediate representation** to preserve ISL grammar  
- **AI sequence models** to understand temporal and spatial patterns  
- **Large Language Models (LLMs)** for grammar-aware sentence reconstruction  
- **Speech output** for real-world communication with non-signers  

This approach avoids broken translations and enables clear expression.

---

## 👥 Who is it for?

- **Deaf & Hard-of-Hearing (DHH)** individuals  
- **Mute / non-verbal** users  
- **ISL learners** (students, teachers, caregivers)  
- **Non-signers** communicating with ISL users  

---

## 🧠 Key Capabilities

### 🔹 ISL → Speech (Primary Focus)
- Camera-based ISL gesture capture  
- AI-driven ISL gloss generation  
- Gloss-to-natural-language conversion using LLMs  
- Text-to-speech output in Indian languages  

### 🔹 Two-Way Communication
- Speech-to-text for non-signers  
- Text-based responses for ISL users  
- Designed to be simple, readable, and efficient  

### 🔹 Learning & Feedback
- AI-assisted evaluation of learner gestures  
- Feedback on correctness and improvement areas  
- Supports ISL literacy and long-term inclusion  

---

## 🏗️ System Design (High Level)

SignVaarta follows a **modular, cloud-ready architecture**:

- **Computer Vision** – Gesture landmark extraction  
- **Sequence Modeling** – ISL gloss generation  
- **Language Models** – Gloss-to-text translation  
- **Speech Services** – Text-to-speech output  
- **Serverless Backend** – Scalable orchestration  

📄 Detailed architecture diagrams and design rationale are available in  
[`design.md`](./design.md)

---

## ☁️ AWS & AI Usage

The platform is designed for AWS deployment with **cost-aware, scalable services**:

- **Amazon SageMaker** – Model hosting and inference  
- **AWS Bedrock** – LLM-based gloss-to-text translation  
- **AWS Lambda** – Serverless orchestration  
- **Amazon Polly** – Text-to-speech synthesis  
- **Amazon Transcribe** – Speech-to-text (secondary feature)  
- **Amazon S3 / DynamoDB** – Model artifacts and user preferences  

The **hackathon MVP** focuses on demonstrating the core ISL → gloss → text pipeline, while the architecture supports future scaling.

---

## 📂 Repository Structure

![alt text](image-2.png)


---

## 🔒 Privacy & Responsible AI

- No long-term storage of raw video or audio  
- Temporary session data only (auto-deleted)  
- Explicit user consent for any data used in model improvement  
- Accessibility, inclusion, and user dignity are core design principles  

---

## 🚀 Project Status

- ✅ Requirements finalized using **AWS Kiro**  
- ✅ Architecture designed with **MVP feasibility** in mind  
- 🔄 Prototype implementation planned  

> *The hackathon MVP demonstrates the core ISL-to-gloss-to-text pipeline using a limited gesture set, while the full architecture illustrates real-world scalability and impact.*

---

## 🏁 Hackathon Context

- **Hackathon**: AWS AI for Bharat  
- **Theme**: AI for Communities, Access & Public Impact  
- **Project Name**: SignVaarta  
- **Team**: TheCodeHers  

---

### 📌 Note to Evaluators

This repository prioritizes:
- Clear problem understanding  
- Linguistically correct use of AI  
- Realistic MVP scope  
- Responsible and justified AWS usage  

The focus is on **sound system design and social impact**, with implementation depth scalable beyond the hackathon.

---
