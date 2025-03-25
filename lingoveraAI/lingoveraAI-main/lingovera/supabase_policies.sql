-- Users tablosu için RLS (Row Level Security) politikaları

-- Önce RLS'yi etkinleştir
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Kimliği doğrulanmış kullanıcılar için INSERT politikası
CREATE POLICY "Allow inserts for authenticated users"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = id
);

-- Kullanıcıların kendi verilerini görüntülemesi için SELECT politikası
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
);

-- Kullanıcıların kendi verilerini güncellemesi için UPDATE politikası
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id
);

-- Kullanıcıların kendi verilerini silmesi için DELETE politikası
CREATE POLICY "Users can delete their own data"
ON public.users
FOR DELETE
TO authenticated
USING (
  auth.uid() = id
);

-- Yöneticilerin tüm kullanıcı verilerini görüntülemesi için SELECT politikası
-- Not: Bu politikayı sadece yönetici rolü varsa kullanın
-- CREATE POLICY "Admins can view all user data"
-- ON public.users
-- FOR SELECT
-- TO authenticated
-- USING (
--   auth.jwt() -> 'role' = 'admin'
-- ); 