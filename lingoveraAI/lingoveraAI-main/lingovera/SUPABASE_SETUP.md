# Supabase Kurulum ve Kimlik Doğrulama Rehberi

Bu rehber, Lingovera projesinde Supabase kimlik doğrulama sisteminin nasıl kurulacağını ve kullanılacağını açıklar.

## 1. Supabase Ayarları

### Authentication Ayarları

1. Supabase Dashboard'da projenize gidin
2. Sol menüden "Authentication" > "Providers" seçeneğine tıklayın
3. "Email" sağlayıcısının etkin olduğundan emin olun
4. "Enable Email Signup" seçeneğinin açık olduğundan emin olun
5. "Authentication" > "Settings" bölümüne gidin
6. "Email Auth" ayarlarını kontrol edin:
   - "Enable email confirmations" seçeneği, kullanıcıların e-posta adreslerini doğrulamasını gerektiriyorsa açık olmalıdır
   - Eğer e-posta doğrulaması istemiyorsanız, bu seçeneği kapatabilirsiniz

### Database Ayarları

1. Supabase Dashboard'da "Table Editor" bölümüne gidin
2. "users" tablosunun aşağıdaki sütunlara sahip olduğundan emin olun:
   - `id` (UUID, primary key)
   - `email` (text)
   - `username` (text)
   - `full_name` (text)
   - `avatar_url` (text, nullable)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)
   - `is_active` (boolean)
   - `last_login` (timestamptz, nullable)

3. RLS (Row Level Security) politikalarını ayarlayın:
   - "users" tablosuna gidin
   - "Policies" sekmesine tıklayın
   - Aşağıdaki politikaları ekleyin (veya `supabase_policies.sql` dosyasındaki SQL kodlarını çalıştırın):

```sql
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
```

## 2. Sorun Giderme

### Kullanıcı Auth'da var ama users tablosunda yok

Bu durumda, kullanıcı Supabase Auth sisteminde oluşturulmuş ancak users tablosuna eklenmemiş demektir. Bu sorunu çözmek için:

1. Supabase Dashboard'da "Authentication" > "Users" bölümünden kullanıcı ID'sini bulun
2. "Table Editor" > "users" tablosuna gidin
3. "Insert" butonuna tıklayın ve kullanıcı bilgilerini manuel olarak ekleyin:
   - `id`: Auth sistemindeki kullanıcı ID'si
   - `email`: Kullanıcının e-posta adresi
   - Diğer gerekli alanları doldurun

### Invalid login credentials hatası

Bu hata genellikle şu durumlarda oluşur:

1. E-posta adresi veya şifre yanlış
2. Kullanıcı Auth sisteminde yok
3. E-posta doğrulaması gerekiyor ancak kullanıcı e-postasını doğrulamamış

Çözüm:
- Kullanıcının e-posta adresini ve şifresini kontrol edin
- Kullanıcının Auth sisteminde olduğundan emin olun
- E-posta doğrulama ayarlarını kontrol edin

## 3. Kod Açıklamaları

### Kayıt İşlemi (RegisterModal.tsx)

Kayıt işlemi iki adımda gerçekleşir:
1. Kullanıcı Supabase Auth sistemine kaydedilir
2. Kullanıcı bilgileri users tablosuna eklenir

### Giriş İşlemi (LoginModal.tsx)

Giriş işlemi şu adımları içerir:
1. Kullanıcı Supabase Auth ile giriş yapar
2. Kullanıcı bilgileri users tablosundan çekilir
3. Eğer kullanıcı Auth'da var ama users tablosunda yoksa, otomatik olarak users tablosuna eklenir

## 4. Önemli Notlar

- Supabase Auth ve Database sistemleri ayrı sistemlerdir ve otomatik olarak senkronize olmazlar
- Kullanıcı kayıt işlemi sırasında her iki sisteme de kayıt yapılmalıdır
- RLS politikaları, veritabanı güvenliği için çok önemlidir ve doğru yapılandırılmalıdır
- Tarayıcı konsolunda hata mesajlarını kontrol ederek sorunları teşhis edebilirsiniz 