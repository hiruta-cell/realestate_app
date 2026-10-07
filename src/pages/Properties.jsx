import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../api/properties'
import PropertyForm from '../components/PropertyForm'

// 物件一覧画面（ログイン後に表示）
export default function Properties() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // 編集中の物件 ID（null なら編集していない）
  const [editingId, setEditingId] = useState(null)

  // 画面表示時に自分の物件一覧を取得する
  useEffect(() => {
    fetchProperties()
      .then(setProperties)
      .catch((err) => setError('物件の取得に失敗しました：' + err.message))
      .finally(() => setLoading(false))
  }, [])

  // 新規登録
  const handleCreate = async (values) => {
    setError('')
    try {
      const created = await createProperty(values)
      setProperties((prev) => [created, ...prev])
      return true
    } catch (err) {
      setError('物件の登録に失敗しました：' + err.message)
      return false
    }
  }

  // 更新
  const handleUpdate = async (id, values) => {
    setError('')
    try {
      const updated = await updateProperty(id, values)
      setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)))
      setEditingId(null)
      return true
    } catch (err) {
      setError('物件の更新に失敗しました：' + err.message)
      return false
    }
  }

  // 削除（確認ダイアログを出してから実行する）
  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return
    setError('')
    try {
      await deleteProperty(property.id)
      setProperties((prev) => prev.filter((p) => p.id !== property.id))
    } catch (err) {
      setError('物件の削除に失敗しました：' + err.message)
    }
  }

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

      {/* 新規登録フォーム */}
      <section className="panel">
        <h2 className="panel-title">物件を登録</h2>
        <PropertyForm submitLabel="登録する" onSubmit={handleCreate} />
      </section>

      {error && <p className="error page-error">{error}</p>}

      {/* 物件をカード形式で表示する */}
      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty">登録された物件はまだありません。</p>
      ) : (
        <div className="card-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              // 編集中のカードはフォームに切り替える
              <div key={property.id} className="card">
                <PropertyForm
                  initialValues={property}
                  submitLabel="保存"
                  onSubmit={(values) => handleUpdate(property.id, values)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div key={property.id} className="card">
                <h2 className="card-title">{property.name}</h2>
                <p className="card-rent">
                  家賃：{property.rent.toLocaleString('ja-JP')}円／月
                </p>
                <p className="card-area">エリア：{property.area}</p>
                <p className="card-area">間取り：{property.layout}</p>
                <div className="card-actions">
                  <button className="secondary-button" onClick={() => setEditingId(property.id)}>
                    編集
                  </button>
                  <button className="danger-button" onClick={() => handleDelete(property)}>
                    削除
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
