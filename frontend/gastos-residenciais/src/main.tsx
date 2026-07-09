// Nucleo do nosso projeto react, tudo passa por aqui

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import TransactionPage from './pages/TransactionPage.tsx'
const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*Provider para permitir o uso/controle de queries*/}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Rotas do sistemas */}
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/person/:personId/transactions' element={<TransactionPage />} />
        </Routes>

      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
