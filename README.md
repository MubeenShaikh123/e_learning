# My Next.js E-Learning & Job Prep Platform

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It serves as a personal e-learning and career development project designed to help users learn, test their knowledge, and tailor their resumes for specific job applications.

---

## Features

This platform is built with a focus on comprehensive career preparation:

### 1. Courses
Users can **enroll** in a variety of courses and access **pre-recorded video lectures** to build their skills in a structured learning environment.

### 2. Quizzes
The **Quizzes section** allows users to test their knowledge and track their progress by attempting assessments related to the course content.

### 3. Resume Generator & Document Tools (AI-Powered)
This is a powerful section for job seekers. Users can:
* **Upload a Word document template** containing placeholder **variables** (e.g., `{job title}`, `{profile}`).
* Provide a **job description**.
* The system can then **generate content for the variables using AI** (currently powered by the **Gemini API**) or allow the user to **manually enter information**.
* This process generates a highly tailored resume or cover letter for a specific job role.

### 4. Dashboard
A personalized area for users to manage their **profile details**, track their **course progress**, and view their **activity history**.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev