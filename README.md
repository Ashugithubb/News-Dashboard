# Agentic Intel - Frontend

The frontend for **Agentic Intel**, a next-generation AI newsletter orchestration platform. Built with a focus on rich aesthetics, interactive UX, and seamless AI integration.

## ✨ Features

- **🚀 AI Drafting Suite**: Interactive interface for generating, refining, and styling AI newsletters.
- **📊 Real-time Dashboard**: Comprehensive overview of publication stats and historical drafts.
- **✍️ Premium Editor**: Tiptap-powered rich text editor with custom extensions for fonts, colors, and Cloudflare R2 image uploads.
- **📱 PWA Ready**: Fully installable Progressive Web App with custom install prompts and offline capabilities.
- **🔐 Secure Auth**: Robust session management and protected routes powered by Supabase.
- **🎨 Modern UI/UX**: Fluid animations with Framer Motion, sleek dark mode, and responsive layouts.

## 🛠️ Tech Stack

### Framework & Language
- **Next.js 15 (App Router)** - React for the modern web.
- **TypeScript** - For type-safe, maintainable code.

### State & Logic
- **Redux Toolkit** - Global state management for news data and UI states.
- **Supabase SSR** - For authentication and backend interaction.
- **React Hook Form + Zod** - Type-safe form validation.

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework.
- **Framer Motion** - High-performance animations and transitions.
- **Radix UI + Lucide Icons** - High-quality, accessible UI primitives.

### Editor Suite
- **Tiptap** - Headless editor with custom extensions for:
  - Font Family & Size
  - Highlight & Color
  - Subscript & Superscript
  - Text Alignment
  - Image Uploads (Integrated with R2)

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages, Layouts, API routes)
├── components/     # UI Components
│   ├── ui/         # Base Radix+Atomic primitives
│   ├── dashboard/  # Stats and Hero sections
│   ├── editor/     # Rich text editor implementation
│   └── navbar/     # Responsive navigation
├── store/          # Redux slices and thunks
├── lib/            # Shared utilities (Supabase client, API helpers)
├── hooks/          # Custom React hooks
└── contexts/       # Authentication and Theme contexts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. Start development:
   ```bash
   npm run dev
   ```

## 📦 Deployment
The project is optimized for production builds:
```bash
npm run build
npm run start
```
Also supports Dockerized deployments via the provided `Dockerfile`.
