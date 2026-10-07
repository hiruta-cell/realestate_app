import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Properties from './pages/Properties'

// 画面のルーティング設定
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route
            path="/properties"
            element={<ProtectedRoute><Properties /></ProtectedRoute>}
          />
          {/* それ以外の URL は物件一覧へ（未ログインならログイン画面へ転送される） */}
          <Route path="*" element={<Navigate to="/properties" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
