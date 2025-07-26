import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ModelTryItOutPage from './components/pages/ModelTryItOutPage'
import Contact from './components/pages/Contact'
import Features from './components/pages/Features'
import About from './components/pages/About'
import FAQ from './components/pages/FAQ'
import Blogs from './components/pages/Blogs'
import PageNotFound from './components/pages/PageNotFound'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ModelTryItOutPage />
      )
    },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/features',
      element: <Features />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/blogs',
      element: <Blogs />
    },
    {
      path: '/faq',
      element: <FAQ />
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
