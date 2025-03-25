-- Bu SQL sorgusu, subcategories tablosundaki image_url değerlerini Supabase Storage'daki yollarla günceller

-- Örnek update sorgusu - Her alt kategori için bu şekilde güncelleme yapmanız gerekecek
-- cafe.jpg yerine cafe.png kullanılacak ve Supabase storage yolu eklenecek

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/cafe.png'
WHERE name = 'Kafe';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/restaurant.png'
WHERE name = 'Restoran';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/hotel.png'
WHERE name = 'Otel';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/travel.png'
WHERE name = 'Seyahat';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/shopping.png'
WHERE name = 'Alışveriş';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/emergency.png'
WHERE name = 'Acil Durum';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/dating.png'
WHERE name = 'Tanışma';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/business.png'
WHERE name = 'İş Görüşmesi';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/conference.png'
WHERE name = 'Konferans';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/classroom.png'
WHERE name = 'Sınıf';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/clothing.png'
WHERE name = 'Giyim';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/greeting.png'
WHERE name = 'Selamlama';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/grocery.png'
WHERE name = 'Market';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/introduction.png'
WHERE name = 'Tanıtım';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/medical.png'
WHERE name = 'Sağlık';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/meeting.png'
WHERE name = 'Toplantı';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/ordering.png'
WHERE name = 'Sipariş';

UPDATE subcategories
SET image_url = 'https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images/transport.png'
WHERE name = 'Ulaşım';

-- NOT: URL'lerin tamamı gerçek Supabase projenizin URL'sine göre güncellenmiştir
-- https://yazlirpnjlkpxkkpedse.supabase.co 