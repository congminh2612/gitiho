import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomeScreen from './features/home/HomeScreen'
import SignInScreen from './features/auth/SignInScreen'
import SignUpScreen from './features/auth/SignUpScreen'
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
import NewsScreen from './features/news/NewsScreen'
import ForumScreen from './features/forum/ForumScreen'
import LearningProcess from './features/learning-process/LearningProcess'
import LearningSelf from './features/learning-self/LearningSelf'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/news" element={<NewsScreen />} />
            <Route path="/forum" element={<ForumScreen />} />
            <Route path="/learning-process" element={<LearningProcess />} />
            <Route path="/learning-self" element={<LearningSelf />} />
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
