import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/components/RootLayout'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(appRoutes)
