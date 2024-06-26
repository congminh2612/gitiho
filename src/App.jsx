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
import NewDetail from './features/news/NewDetail'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import CourseScreen from './features/courses/CourseScreen'
import LayoutAdmin from './admin/components/LayoutAdmin'
import UserAdminScreen from './admin/features/users/components/UserAdminScreen'
import LearningAdminScreen from './admin/features/learning/LearningAdminScreen'
import NewAdminScreen from './admin/features/news/NewAdminScreen'
import TopicAdminScreen from './admin/features/topic/TopicAdminScreen'
import QuestionAdminScreen from './admin/features/question/QuestionAdminScreen'
import UserDetail from './admin/features/users/components/UserDetail'

function App() {
  const queryClient = new QueryClient()
  const isLoggedIn = useSelector((state) => state.auth.isLogin)
  console.log(isLoggedIn)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/news" element={<NewsScreen />} />
            <Route path="/news/:id" element={<NewDetail />} />
            <Route path="/forum" element={<ForumScreen />} />
            <Route
              path="/learning-process"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <LearningProcess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learning-self"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <LearningSelf />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CourseScreen />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="users" element={<UserAdminScreen />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="learning" element={<LearningAdminScreen />} />
            <Route path="news" element={<NewAdminScreen />} />
            <Route path="topic" element={<TopicAdminScreen />} />
            <Route path="question" element={<QuestionAdminScreen />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
