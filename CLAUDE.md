# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

- プロジェクト名: realestate_app（不動産アプリ）
- Supabase 認証付きの不動産管理 Web アプリ
- 技術スタックやディレクトリ構成を変えたら、このファイルの該当セクションを更新すること

## 技術スタック

- React 19 + Vite（JavaScript / JSX）
- ルーティング: react-router-dom
- 認証: Supabase Auth（`@supabase/supabase-js`、メールアドレス＋パスワード）

## ディレクトリ構成

- `src/supabaseClient.js` … Supabase クライアント（`.env` の値を使用）
- `src/contexts/AuthContext.jsx` … ログイン状態を提供する `AuthProvider` / `useAuth`
- `src/components/ProtectedRoute.jsx` … 未ログイン時のリダイレクト（`ProtectedRoute`）と、ログイン済み時のリダイレクト（`GuestRoute`）
- `src/pages/` … 画面（`Login` / `Signup` / `Properties`）
- `src/data/properties.js` … 物件のダミーデータ

## 環境変数

- `.env` に `VITE_SUPABASE_URL` と `VITE_SUPABASE_PUBLISHABLE_KEY` を設定する（雛形は `.env.example`）
- `.env` は `.gitignore` で除外済み。絶対にコミットしない

## 開発コマンド

- `npm install` … 依存パッケージのインストール
- `npm run dev` … 開発サーバー起動（http://localhost:5173）
- `npm run build` … 本番ビルド（コミット前に通ることを確認する）
- `npm run preview` … ビルド結果のプレビュー

## コミュニケーション

- ユーザーへの説明・コメント・コミットメッセージは日本語で書く
- コード上の識別子や技術用語は原語のままでよい

## Git 運用ルール

**コードを変更するたびに、コミットして GitHub にプッシュすること。**

1. 変更は意味のある単位でまとめ、1つの変更ごとにコミットする
2. コミット前に `git status` / `git diff` で変更内容を確認する
3. テストやビルドが用意されている場合は、コミット前に実行して通ることを確認する
4. コミットメッセージは日本語で、何をなぜ変えたかを簡潔に書く
   - 例: `物件一覧画面に価格での絞り込みを追加`
   - 必要に応じて接頭辞を付ける: `feat:` 機能追加 / `fix:` 不具合修正 / `docs:` ドキュメント / `refactor:` リファクタリング / `chore:` 雑務
5. コミット後、すぐに `git push` で GitHub のリモート（`origin`）へプッシュする
6. プッシュに失敗した場合（リモートに新しい変更がある等）は、`git pull --rebase` で取り込んでから再度プッシュする。コンフリクトが起きたら勝手に解決せずユーザーに相談する
7. `--force` によるプッシュ、履歴の書き換え（`rebase -i`、`reset --hard` など）はユーザーの明示的な許可なしに行わない
8. `.env`、APIキー、パスワードなどの秘密情報は絶対にコミットしない（`.gitignore` で除外する）

### ブランチ

- 基本は `main` ブランチで作業する
- 大きな機能追加や実験的な変更は、必要に応じて作業ブランチを切ってから行う
