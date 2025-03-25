-- Users tablosundaki kısıtlamaları kontrol et
SELECT
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name,
  tc.table_name
FROM
  information_schema.table_constraints tc
JOIN
  information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE
  tc.table_schema = 'public'
  AND tc.table_name = 'users'
  AND tc.constraint_type = 'UNIQUE';

-- Belirli bir kullanıcı adının benzersiz olup olmadığını kontrol et
-- Kullanmak için 'your_username' kısmını kontrol etmek istediğiniz kullanıcı adıyla değiştirin
SELECT
  username
FROM
  public.users
WHERE
  username = 'your_username';

-- Kullanıcı adı benzersizlik kısıtlamasını kaldırmak isterseniz (önerilmez)
-- ALTER TABLE public.users DROP CONSTRAINT users_username_key;

-- Kullanıcı adı benzersizlik kısıtlamasını eklemek isterseniz
-- ALTER TABLE public.users ADD CONSTRAINT users_username_key UNIQUE (username); 