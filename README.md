# AI Podcast client README

## Overview
This is a Next.js 13 project that provides the front-end interface for the AI podcast generator. It allows users to:
1. Enter a topic for the podcast.
2. Optionally listen to the generated audio.
3. See the transcript in real-time as the audio plays.
4. Optionally enter an OpenAI API key (if required) and manage usage limits.

## Features
- **Next.js 13**: Uses the app router for layouts and pages.
- **TypeScript**: Provides type safety and better development experience.
- **Tailwind CSS**: Offers utility-first styling with a clean, consistent design.
- **Local Storage Usage Limit**: By default, users can only generate content three times unless in development mode or if they have provided a valid API key (depending on your environment setup).

## Prerequisites
- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Installation
```bash
# In the client/ directory
npm install
# or
yarn install
```

### 2. Development
If you are in development mode (e.g., `APP_ENV=development`), the local usage limit might be disabled.
```bash
npm run dev
# or
yarn dev
```
This will start the development server at [http://localhost:3000](http://localhost:3000).

### 3. Production
Build and run in production mode:
```bash
npm run build
npm run start
```
The production server will run at [http://localhost:3000](http://localhost:3000).

### 4. Environment Variables
- **APP_ENV**: Set to `development` or `production` to toggle certain features (e.g., usage limit).
- **BACKEND_URL**: (Optional) If your backend is deployed on a separate domain or IP, specify it here so the front end can make API calls to the correct endpoint.

### 5. Docker (Optional)
For local Docker-based development, you can use a `docker-compose.yml` or `Dockerfile.dev` setup. Refer to your project’s docker-compose configuration for more details.

### 6. Usage
1. Navigate to the site.
2. Enter a topic in the input box.
3. Click **Generate** to request an AI-generated podcast.
4. If TTS is enabled, an audio player will appear along with a transcript that highlights lines in real-time.
5. In production mode, if you have a valid OpenAI API key, you may provide it (depending on your design) to bypass the 3-use limit.

### 7. Contributing
Feel free to open issues or submit pull requests for improvements.
