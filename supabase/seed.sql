-- =========================================================
-- ダミーデータ投入用（3件）
-- 1. 下の 'your-email@example.com' を、アプリでログインしているメールアドレスに書き換える
-- 2. Supabase ダッシュボードの SQL Editor に貼り付けて実行する
-- ※ RLS により、ここで指定したユーザーにだけ表示される
-- =========================================================

insert into public.properties (user_id, name, rent, area, layout)
select u.id, d.name, d.rent, d.area, d.layout
from auth.users u
cross join (
  values
    ('サンライズ渋谷',     128000, '東京都渋谷区',   '1LDK'),
    ('グリーンハイツ中野',  85000, '東京都中野区',   '1K'),
    ('メゾン横浜みなと',    96000, '神奈川県横浜市', '2DK')
) as d (name, rent, area, layout)
where u.email = 'your-email@example.com';
