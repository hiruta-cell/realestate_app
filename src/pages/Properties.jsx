import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import { properties } from '../data/properties'

// 物件一覧画面（ログイン後に表示）
export default function Properties() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // ログアウトしてログイン画面へ戻る
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="properties-page">
      <header className="header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            ログアウト
          </button>
        </div>
      </header>

      {/* 物件をカード形式で表示する */}
      <div className="card-grid">
        {properties.map((property) => (
          <div key={property.id} className="card">
            <h2 className="card-title">{property.name}</h2>
            <p className="card-rent">
              家賃：{property.rent.toLocaleString('ja-JP')}円／月
            </p>
            <p className="card-area">エリア：{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
