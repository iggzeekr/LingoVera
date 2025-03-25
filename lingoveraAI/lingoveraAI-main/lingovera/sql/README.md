# Veritabanı Güncelleme Talimatları

Bu klasör, veritabanı üzerinde yapılacak güncellemeler için SQL sorgularını içerir.

## Alt Kategori Resimlerini Supabase Storage'a Taşıma

Alt kategorilerin resimlerini Supabase Storage'a taşımak ve veritabanında bu resimlere referans vermek için aşağıdaki adımları izleyin:

### 1. Resimleri JPG'den PNG'ye Dönüştürme

Öncelikle, mevcut JPG formatındaki resimlerinizi PNG formatına dönüştürmeniz gerekiyor. Bunun için çevrimiçi bir dönüştürücü veya bir grafikler programı (Photoshop, GIMP vb.) kullanabilirsiniz.

### 2. Resimleri Supabase Storage'a Yükleme

1. Supabase Dashboard'a giriş yapın
2. Sol menüden "Storage" kısmına gidin
3. "images" adında bir bucket oluşturun (varsa doğrudan kullanın)
4. "Upload File" butonunu kullanarak PNG formatına dönüştürdüğünüz resimleri yükleyin
5. Her resmin URL'sini not edin (resmin üzerine tıklayıp "Get URL" seçeneğini kullanabilirsiniz)

### 3. Veritabanı Güncellemesi

Resimleri yükledikten sonra, alt kategorilerin image_url alanlarını güncellemek için:

1. Supabase panelinde "SQL Editor" kısmına gidin
2. Yeni bir sorgu oluşturun
3. `update_subcategory_images.sql` dosyasındaki SQL sorgularını kopyalayın
4. Sorguları düzenleyerek her kategori için doğru resim URL'lerini ekleyin:
   - Her URL'de "supabasestorage_url" kısmını sizin Supabase projenizin gerçek URL'si ile değiştirin
   - Her sorguyu veritabanınızdaki gerçek alt kategori adlarını kullanarak güncelleyin
5. Sorguları çalıştırın

### Örnek URL Formatı:

```
https://your-project-ref.supabase.co/storage/v1/object/public/images/cafe.png
```

Burada "your-project-ref" yerine sizin Supabase projenizin referansını yazmanız gerekir.

## Image_URL Sütununu Kaldırma

`categories` tablosundaki `image_url` sütununu tamamen kaldırmak için, `drop_image_url_column.sql` dosyasındaki SQL sorgusu kullanılabilir.

### Supabase'de Nasıl Çalıştırılır

1. Supabase paneline giriş yapın
2. Sol menüden "SQL Editor" seçeneğine tıklayın
3. "New Query" butonuna tıklayın
4. `drop_image_url_column.sql` dosyasındaki sorguyu kopyalayıp yapıştırın:

```sql
ALTER TABLE categories 
DROP COLUMN image_url;
```

5. "Run" butonuna tıklayarak sorguyu çalıştırın

### Önemli Notlar

- Sorguyu çalıştırmadan önce veritabanınızın yedeğini almayı unutmayın
- Bu işlem geri alınamaz; `image_url` sütunu ve içindeki tüm veriler tamamen silinecektir
- Bu değişiklikten sonra kodunuzu da buna göre güncellemeniz gerekecektir, çünkü artık `image_url` alanına erişilemeyecektir
- TypeScript arayüzünde (interface) tanımlanan `image_url` alanını da kaldırmanız gerekecektir

## Kategori Resimlerini Güncelleme

(Artık gerekli değil - image_url sütunu kaldırılacak.)

### Supabase'de Nasıl Çalıştırılır

1. Supabase paneline giriş yapın
2. Sol menüden "SQL Editor" seçeneğine tıklayın
3. "New Query" butonuna tıklayın
4. `update_category_images.sql` dosyasındaki sorguları kopyalayıp yapıştırın
5. "Run" butonuna tıklayarak sorguları çalıştırın

### Hızlı Çözüm

Sadece eski image_url'leri temizlemek istiyorsanız, aşağıdaki basit sorguyu çalıştırabilirsiniz:

```sql
UPDATE categories
SET image_url = NULL;
```

Böylece tüm image_url değerleri boş (NULL) olarak güncellenecektir.

### Varsayılan Kategori Resimleri Oluşturma

SQL sorgularında referans verilen varsayılan resim dosyalarını oluşturmanız gerekir:

1. Basit, genel bir kategori simgesi oluşturun ve `/public/default-category.jpg` adıyla kaydedin
2. Her kategori için özel simgeler oluşturmak isterseniz, aşağıdaki dosya adlarıyla kaydedin:
   - `/public/default-category-restaurant.jpg`
   - `/public/default-category-social.jpg`
   - `/public/default-category-travel.jpg`
   - `/public/default-category-business.jpg`
   - `/public/default-category-meeting.jpg`
   - `/public/default-category-emergency.jpg`
   - `/public/default-category-education.jpg`
   - `/public/default-category-shopping.jpg`

Alternatif olarak, bu resimleri kullanmak istemiyorsanız, SQL sorgusunu değiştirip tüm kategoriler için tek bir varsayılan resim kullanabilirsiniz:

```sql
-- Tüm kategoriler için tek varsayılan resim kullanma
UPDATE categories
SET image_url = '/default-category.jpg';
```

### Önemli Notlar

- Sorguları çalıştırmadan önce veritabanınızın yedeğini almayı unutmayın
- Tabloda her bir kategorinin kendi ID'si kullanılmıştır; bu nedenle kategorilerin isimlerini değiştirseniz bile doğru çalışacaktır
- Bu sorgular, eski `/images/categories/...` yollarını güncelleyecektir 