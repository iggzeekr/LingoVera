# Alt Kategori Resimlerini Supabase Storage'a Taşıma

Bu klasör, alt kategori resimlerini JPG'den PNG'ye dönüştürmek ve Supabase Storage'a yüklemek için gerekli scriptleri içerir.

## Genel Bakış

Uygulama performansını artırmak için, alt kategori resimlerini Supabase Storage'a taşıyoruz. Bu süreç şu adımları içerir:

1. JPG formatındaki resimleri PNG'ye dönüştürme
2. PNG resimlerini Supabase Storage'a yükleme
3. Veritabanındaki `subcategories` tablosunu yeni resim URL'leri ile güncelleme

## 1. Resimleri Dönüştürme

### Ön Koşullar

- Node.js kurulu olmalıdır
- Sharp ve fs-extra paketleri gereklidir

### Kurulum

```bash
npm install sharp fs-extra
```

### Kullanım

```bash
node prepare-subcategory-images.js
```

Bu script şunları yapacaktır:
- `frontend/public/images/subcategories` klasöründeki tüm JPG dosyalarını bulma
- Bu dosyaları PNG formatına dönüştürme
- Dönüştürülen dosyaları `temp/converted-images` klasörüne kaydetme

## 2. Resimleri Supabase Storage'a Yükleme

1. Supabase Dashboard'a giriş yapın
2. Sol menüden "Storage" kısmına gidin
3. "images" adında bir bucket oluşturun (varsa doğrudan kullanın)
4. "Upload File" butonunu kullanarak dönüştürülen PNG dosyalarını yükleyin
5. Her resim için URL'leri not edin (resmin üzerine tıklayıp "Get URL" seçeneğini kullanabilirsiniz)

## 3. Veritabanını Güncelleme

1. Supabase Dashboard'da SQL Editor'a gidin
2. `../sql/update_subcategory_images.sql` dosyasındaki SQL sorgularını kopyalayın
3. Her sorgunun içindeki URL'leri kendi Supabase projenizin URL'leri ile değiştirin:
   - `supabasestorage_url` yerine kendi projenizin URL'sini yazın
   - Alt kategori adlarını kendi veritabanınızdakilerle eşleştirin
4. Güncellenen SQL sorgularını çalıştırın

## Ek Notlar

- Bu işlemden sonra, lokal `public/images/subcategories` klasörü artık kullanılmayacaktır
- Tüm resim referansları veritabanında saklanacaktır
- Yeni alt kategoriler eklerken, resimleri doğrudan Supabase Storage'a yükleyin ve URL'leri veritabanına kaydedin 