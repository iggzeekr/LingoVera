/**
 * Bu script alt kategori resimlerini JPG'den PNG'ye dönüştürür ve
 * bunları Supabase'e yüklemek için hazırlar.
 * 
 * Kullanım:
 * 1. Node.js kurulu olmalıdır
 * 2. "npm install sharp fs-extra" komutunu çalıştırın
 * 3. "node prepare-subcategory-images.js" komutunu çalıştırın
 */

const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

// Kaynak ve hedef klasörlerini tanımlayın
const sourceDir = path.join(__dirname, '../frontend/public/images/subcategories');
const destDir = path.join(__dirname, '../temp/converted-images');

// Hedef klasörünü oluşturun
fs.ensureDirSync(destDir);

async function convertImages() {
  try {
    // Kaynak klasöründeki tüm JPG dosyalarını listeleyin
    const files = await fs.readdir(sourceDir);
    const jpgFiles = files.filter(file => file.toLowerCase().endsWith('.jpg'));
    
    console.log(`${jpgFiles.length} JPG dosyası bulundu. Dönüştürme başlatılıyor...`);
    
    // Her bir JPG dosyasını PNG'ye dönüştürün
    for (const file of jpgFiles) {
      const sourceFile = path.join(sourceDir, file);
      const fileName = path.basename(file, '.jpg');
      const destFile = path.join(destDir, `${fileName}.png`);
      
      console.log(`Dönüştürülüyor: ${file}`);
      
      await sharp(sourceFile)
        .toFormat('png')
        .toFile(destFile);
      
      console.log(`Dönüştürme tamamlandı: ${fileName}.png`);
    }
    
    console.log('\nTüm dönüştürmeler tamamlandı. Dosyalar şu klasörde bulunabilir:');
    console.log(destDir);
    console.log('\nBu dosyaları Supabase Storage\'a yükleyin ve sonra veritabanını güncelleyin.');
    
    // Yükleme talimatlarını yazdırın
    console.log('\nSupabase Storage\'a yükleme adımları:');
    console.log('1. Supabase Dashboard\'a giriş yapın');
    console.log('2. Sol menüden "Storage" kısmına gidin');
    console.log('3. "images" adında bir bucket oluşturun (varsa doğrudan kullanın)');
    console.log('4. "Upload File" butonunu kullanarak PNG dosyalarını yükleyin');
    console.log('5. Her resmin URL\'sini not edin ve SQL sorgularında kullanın');
    
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
}

// Scripti çalıştırın
convertImages(); 