# Prohor Client

A modern, performant React 18+ client application built with Vite, TypeScript, Tailwind CSS, and Zustand state management.

---

## About

`prohor-client` is the front-end client for the Prohor platform.  
It leverages the latest React ecosystem features including React Router v7, React Query, Zustand, and the Radix UI component primitives for accessible UI components.

The app is designed for:

- High performance via Vite's fast build system
- Responsive UI styled with Shadcn and Tailwind CSS and class-variance-authority for utility-driven styling
- Rich text editing powered by TipTap extensions
- Form management with React Hook Form and Zod validation
- Smooth animations with Framer Motion

---

## Tech Stack

| Category          | Libraries / Tools                      |
| ----------------- | ------------------------------------ |
| Framework         | React 19.x                           |
| Bundler           | Vite                                |
| Styling           | Tailwind CSS, class-variance-authority, tw-animate-css |
| State Management  | Zustand                             |
| Routing           | React Router DOM v7                  |
| API & Data Fetch  | Axios, React Query                   |
| Forms & Validation| React Hook Form, Zod, @hookform/resolvers |
| UI Components     | Radix UI (AlertDialog, Avatar, Tooltip, etc.) |
| Rich Text Editor  | TipTap + Extensions                  |
| Animations        | Framer Motion                       |
| Tooling           | ESLint, TypeScript, Prettier (assumed) |

---

## Getting Started

### Prerequisites

- Node.js (>=18.x recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/dassajib/prohor-client.git
cd prohor-client
npm install
# or
yarn install

### Running in Development
npm run dev
# or
yarn dev

### Environment Variables
Example .env:
VITE_API_URL=https://api.prohor.com
VITE_OTHER_VARIABLE=your_value

### Author
Sajib Das
GitHub: github.com/dassajib


