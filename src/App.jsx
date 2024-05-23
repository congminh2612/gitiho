import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomeScreen from './features/home/HomeScreen'
import SignInScreen from './features/auth/SignInScreen'
import SignUpScreen from './features/auth/SignUpScreen'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/news" element={<HomeScreen />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
