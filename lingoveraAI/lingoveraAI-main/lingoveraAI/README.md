# LingoVera AI

## Proje Hakkında

LingoVera AI, dil öğrenimini kolaylaştırmak için geliştirilmiş bir yapay zeka destekli platformdur.

## Kurulum Adımları

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Ön Gereksinimler

- [Node.js](https://nodejs.org/) (v14 veya üzeri)
- [npm](https://www.npmjs.com/) (Node.js ile birlikte gelir)
- [Git](https://git-scm.com/)
- [Supabase](https://supabase.com/) hesabı

### Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/mhmmtkilic/lingoveraAI.git
   cd lingoveraAI
   ```

2. Backend kurulumu:
   ```bash
   cd lingovera/backend
   npm install
   npm run build
   ```

3. Frontend kurulumu:
   ```bash
   cd ../frontend
   npm install
   ```

4. Supabase 
 supabase olışturduğumuz tablolardan düzenlemeler yapabilirsiniz

5. Backend için `.env` dosyasını oluşturun:
   ```
   cd ../backend
   ```
   Yeni bir `.env` dosyası oluşturun ve aşağıdaki bilgileri ekleyin (kendi Supabase bilgilerinizle):
   ```
   PORT=5000
   SUPABASE_URL=https://your-project-url.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   JWT_SECRET=your-jwt-secret
   ```

6. Frontend için `.env` dosyasını oluşturun:
   ```
   cd ../frontend
   ```
   Yeni bir `.env` dosyası oluşturun ve aşağıdaki bilgileri ekleyin:
   ```
   REACT_APP_SUPABASE_URL=https://your-project-url.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Uygulamayı Çalıştırma

1. Backend'i başlatın:
   ```bash
   cd lingovera/backend
   npm start
   ```

2. Yeni bir terminal penceresinde frontend'i başlatın:
   ```bash
   cd lingovera/frontend
   npm start
   ```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

## Supabase Hakkında

Bu proje veritabanı olarak Supabase kullanmaktadır. Supabase, açık kaynaklı bir Firebase alternatifidir ve PostgreSQL veritabanı üzerine kurulmuştur. Proje için gerekli veritabanı yapısı `ex.sql` dosyasında bulunmaktadır.

## Sorun Giderme

- Eğer bağımlılıklarla ilgili sorun yaşarsanız, `npm install` komutunu tekrar çalıştırmayı deneyin.
- Supabase bağlantısı sorunları için `.env` dosyalarındaki URL ve ANON_KEY değerlerinin doğru olduğundan emin olun.
- Port çakışması durumunda, backend `.env` dosyasında farklı bir port numarası belirleyebilirsiniz.