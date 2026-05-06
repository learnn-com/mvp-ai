import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { MockAuthProvider } from '@/features/auth/mock/MockAuthProvider'
import { router } from '@/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MockAuthProvider>
      <RouterProvider router={router} />
    </MockAuthProvider>
  </StrictMode>,
)
