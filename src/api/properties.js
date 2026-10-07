import { supabase } from '../supabaseClient'

// 物件テーブルへの CRUD 操作をまとめたモジュール
// ※ RLS により、ログイン中のユーザー自身の物件のみが対象になる

const COLUMNS = 'id, name, rent, area, layout, created_at'

// 一覧取得（新しい順）
export async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select(COLUMNS)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// 新規登録（user_id は DB 側の default auth.uid() で自動設定される）
export async function createProperty({ name, rent, area, layout }) {
  const { data, error } = await supabase
    .from('properties')
    .insert({ name, rent, area, layout })
    .select(COLUMNS)
    .single()
  if (error) throw error
  return data
}

// 更新
export async function updateProperty(id, { name, rent, area, layout }) {
  const { data, error } = await supabase
    .from('properties')
    .update({ name, rent, area, layout })
    .eq('id', id)
    .select(COLUMNS)
    .single()
  if (error) throw error
  return data
}

// 削除
export async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw error
}
