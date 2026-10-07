import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext(null)

// ログイン状態（セッション）をアプリ全体に提供するコンポーネント
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // 初回のセッション確認が終わるまでは true
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 起動時に保存済みのセッションを取得する
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // ログイン・ログアウトなどの状態変化を監視する
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    // アンマウント時に監視を解除する
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// ログイン状態を取得するためのフック
export function useAuth() {
  return useContext(AuthContext)
}
