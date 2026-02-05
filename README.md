# 📘 SignVaarta

## 🧩 Project Overview

**SignVaarta** is an AI-powered communication and learning platform designed to bridge the communication gap between **Indian Sign Language (ISL)** users and the broader community.

Unlike dictionary-based or word-to-word translation systems, SignVaarta treats ISL as a **full-fledged visual-spatial language** with its own grammar. The system converts ISL gestures into structured **ISL gloss**, then uses AI-driven language models to generate **fluent natural-language text and speech**, enabling meaningful two-way communication.

This project is developed as part of the **AWS AI for Bharat Hackathon** under the theme **AI for Communities, Access & Public Impact**.

---

## 🎯 Problem Statement

In India, Deaf & Hard-of-Hearing (DHH) and mute individuals primarily communicate using Indian Sign Language. However:

- ISL is not understood by most of the population  
- Existing tools rely on static sign dictionaries or direct word mapping  
- ISL grammar differs significantly from spoken languages  
- Lack of real-time, linguistically accurate translation limits independence  

As a result, everyday communication in education, healthcare, and public services remains inaccessible.

---

## 💡 Solution Approach

SignVaarta addresses this gap through a **linguistically aware AI pipeline**:

**ISL Gestures → ISL Gloss → Natural Language → Speech**

Key design principles:
- ISL is treated as a **language**, not a gesture set
- Gloss is used as an **intermediate representation**
- AI models handle temporal, spatial, and contextual information
- Architecture is **AWS-ready** and **MVP-feasible**

---

## 👥 Target Users

- Deaf & Hard-of-Hearing (DHH) individuals  
- Mute / non-verbal users  
- ISL learners (students, teachers, caregivers)  
- Non-signers communicating with ISL users  

---

## 🧠 Core Features

### 🔹 ISL to Speech (Primary Focus)
- Camera-based ISL gesture capture
- ISL gloss generation preserving linguistic structure
- AI-based gloss-to-text conversion using LLMs
- Text-to-speech output in Indian languages

### 🔹 Bidirectional Communication
- Speech-to-text for non-signers
- Text-based response for ISL users
- Designed to be simple, efficient, and readable

### 🔹 ISL Learning & Feedback
- AI-assisted evaluation of learner gestures
- Feedback on correctness and improvement areas
- Supports ISL literacy and inclusion

---

## 🏗️ System Architecture (High-Level)

The platform follows a modular, cloud-ready architecture:

- **Computer Vision** for gesture landmark extraction  
- **Sequence Modeling** for ISL gloss generation  
- **Language Models** for gloss-to-natural-language translation  
- **Speech Services** for text-to-speech output  
- **Serverless Backend** for scalable orchestration  

Detailed architecture and data flow diagrams are available in [`design.md`](./design.md).

---

## ☁️ AWS Usage

SignVaarta is designed for AWS-based deployment with cost-aware, scalable components:

- **Amazon SageMaker** – Model hosting and inference  
- **AWS Bedrock** – LLM-based gloss-to-text translation  
- **AWS Lambda** – Serverless orchestration  
- **Amazon Polly** – Text-to-speech synthesis  
- **Amazon Transcribe** – Speech-to-text (secondary feature)  
- **Amazon S3 / DynamoDB** – Model artifacts and user preferences  

The hackathon MVP focuses on **core functionality**, while the architecture supports future scaling.

---

## 📂 Repository Structure

![alt text](image.png)


---

## 🔒 Privacy & Ethics

- No long-term storage of raw video or audio data  
- Temporary session data only, auto-deleted  
- Explicit user consent required for any data used in model improvement  
- Designed with accessibility and inclusion as first-class goals  

---

## 🚀 Project Status

- ✅ Requirements finalized using AWS Kiro  
- ✅ System design aligned with MVP feasibility  
- 🔄 Prototype implementation (future phase)  

*The hackathon MVP focuses on demonstrating the ISL-to-gloss-to-text pipeline with a limited gesture set, while the full architecture illustrates scalability and future impact.*

---

## 🏁 Hackathon Context

- **Hackathon**: AWS AI for Bharat  
- **Theme**: AI for Communities, Access & Public Impact  
- **Project Name**: SignVaarta  
- **Team**: TheCodeHers  

---

### 📌 Note to Evaluators

This repository intentionally prioritizes:
- Clear problem understanding  
- Linguistically correct AI design  
- Realistic MVP scope  
- Responsible and justified use of AWS services  

Implementation details can evolve, but the architectural and requirement foundations are designed to be **sound, scalable, and impactful**.

