# KOZA.AI

KOZA.AI is a modern web application designed to help users transform their challenges into empowering stories and interactive games. By leveraging generative AI and a structured narrative framework, KOZA.AI facilitates personal growth and empathy building.

## 🚀 Recent Migration: Next.js & Solo Koza

The project has recently undergone a significant architectural shift:
- **Next.js Migration**: Transitioned from a Vite-based React app to the **Next.js App Router** for improved performance, SEO, and developer experience.
- **Solo Koza Restoration**: Reverted to the "Solo Koza" architecture, focusing on a streamlined **Firebase-centric** model for identity, persistence, and community features, removing external social media dependencies (Mastodon).

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: [XState](https://xstate.js.org/) for robust, deterministic state machines.
- **Backend / DB / Auth**: [Firebase](https://firebase.google.com/) (Firestore, Authentication).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS.
- **Icons**: [Lucide React](https://lucide.dev/).
- **AI Integration**: Custom services for generative story and game creation.

## 📁 Project Structure

- `src/app/`: Next.js App Router root (Layouts, Pages).
- `src/views/`: Main application views (Home, Story, Game, Profile).
- `src/components/`: Reusable UI components (Cocoon, Galaxy, Layout, etc.).
- `src/context/`: React Context providers for global state (Auth, User, UI, App).
- `src/machines/`: XState machines defining domain logic.
- `src/services/`: External service integrations (Firebase, Firestore).
- `src/utils/`: Utility functions (Analytics, Error tracking, Accessibility).

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root and add your Firebase and API configurations (see `.env.example` if available).

### Development

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### Build

Create an optimized production build:
```bash
npm run build
```

## 🌟 Core Features

- **Transformation Canvas**: Highly interactive landing page experience.
- **AI Story Generation**: Transform personal narratives through the Cocoon-to-Butterfly framework.
- **Community Feed**: Share your transformations and explore others' journeys in a Firebase-driven public feed.
- **Gamified Progress**: Earn XP, levels, and achievements as you engage with the platform.

---
*KOZA.AI — Yolculuğa Başla.*
