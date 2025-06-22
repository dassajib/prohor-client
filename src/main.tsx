import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
