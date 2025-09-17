This work is licensed under CC BY‑NC 4.0. Non‑commercial use only.
# Portfolio
## Application Architecture Diagram
<img width="1904" height="1484" alt="output" src="https://github.com/user-attachments/assets/9bfb1918-ae54-4f7b-a878-7a84c34cc395" />

## Project Overview:
Developed a revenue-generating web service with PG payment (TOSS) functionality using Vite, React(JSX), Node.js, and PWA, deployed on GCP with goDaddy domain registration
Converted to mobile app using Capacitor with in-app purchase implementation and published on Google Play Store
Currently maintaining and optimizing performance for ongoing service operation

## Project Features

### Cosmos Tarot
- **Duration**: Nov 2023 - Aug 2024 (10 months) + alpha(Operations & Maintenance )
- **Platforms**: Web (Google Cloud Platform), Android (Capacitor), PWA
- **Role**: Solo Developer - End-to-end development from concept to deployment
- **Responsibilities**: Project planning, design, system architecture, full-stack development, deployment

### Technology Stack:
- **Frontend**: React, Three.js, Redux Toolkit, SCSS, Capacitor
- **Backend**: Node.js (Express), MongoDB (Mongoose)
- **Build Tools**: Vite, GLTF Transform, react-spa-prerender
- **Integrations**: GPT API, Google OAuth, Toss Payment, i18next
- **Infrastructure**: Google Cloud Platform (App Engine), GoDaddy

### Language & Library
- **Language:** Javascript  
- **Front-End Library:** React, Three.js, @reduxjs/toolkit, recharts, scss, Capacitor, Toss PG Payment, axios, @gltf-transform/cli, gltfjsx, react-spa-prerender, i18next  
- **Back-End Library:** Node.js(Express.js), compression, jsonwebtoken, passport, axios  

### Front-End
- Implemented 3D design pages using Three.js, troika-three-text, and gltfjsx libraries  
- Created user content statistics graphs using recharts (accessible in mobile app's My Page statistics section after free usage through ad mode)  
- Integrated Toss PG payment system  
- SCSS modularization  
- Custom AXIOS module implementation  
- Multi-language service (Korean, English, Japanese) based on browser language settings using react-i18next  
- Static page implementation using react-spa-prerender for crawling optimization  
- Capacitor AdMob and IAP implementation  
- Daily fortune service using Capacitor preferences  
- Pre and runtime caching functionality and PWA implementation through VITE  

### Back-End
- Designed Controller-Service-DAO layered architecture using MongoDB(Mongoose) as ORM  
- Implemented Mongoose TTL Index (Time To Live Index)  
- Applied compression and helmet middleware globally for header security and optimization  
- Implemented Google OAuth login authentication using passport.js and JWT (Access Token, Refresh Token)  
- Implemented Content Security Policy through global middleware  
- Integrated AI(GPT) functionality for user input analysis  

### Deploy
- Deployed through GCP App Engine  
- Registered custom domain with goDaddy
