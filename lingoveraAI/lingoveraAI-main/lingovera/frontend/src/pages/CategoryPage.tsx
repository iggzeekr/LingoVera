import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/CategoryPage.css';
import { toast } from 'react-hot-toast';
import { DarkModeContext } from '../App';
import SubcategoryPath from '../components/SubcategoryPath';
import { Subcategory, Category as CategoryType } from '../types';

interface Category {
  id: number;
  name: string;
  description: string;
  is_new?: boolean;
  is_popular?: boolean;
  icon?: string;
  completion_rate?: number;
  character?: {
    name: string;
    role: string;
    greeting: string;
    personality: string;
    avatar?: string;
  };
}

interface UserProgress {
  category_id: number;
  completed_lessons: number;
  total_lessons: number;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetchCategories();
    // Simüle edilmiş kullanıcı ilerleme durumu
    const mockProgress: UserProgress[] = [
      { category_id: 1, completed_lessons: 3, total_lessons: 5 },
      { category_id: 2, completed_lessons: 1, total_lessons: 4 },
      { category_id: 3, completed_lessons: 0, total_lessons: 3 },
    ];
    setUserProgress(mockProgress);
    // Animasyon için sayfa yüklendikten sonra kartları canlandır
    setTimeout(() => {
      setAnimateCards(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory.id);
    }
  }, [selectedCategory]);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm, activeFilter]);

  // Alt kategorileri zorluk seviyesine göre sırala
  const sortedSubcategories = () => {
    if (!subcategories || subcategories.length === 0) return [];
    
    // Zorluk seviyelerine göre sıralama
    const difficultyOrder: Record<string, number> = {
      'Kolay': 1,
      'Orta': 2,
      'Zor': 3,
      'Easy': 1,
      'Medium': 2,
      'Hard': 3
    };
    
    return [...subcategories].sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty_level] || 0;
      const diffB = difficultyOrder[b.difficulty_level] || 0;
      return diffA - diffB;
    });
  };

  const filterCategories = () => {
    let result = [...categories];
    
    // Arama terimine göre filtrele
    if (searchTerm) {
      result = result.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aktif filtreye göre filtrele
    if (activeFilter === 'new') {
      result = result.filter(category => category.is_new);
    } else if (activeFilter === 'popular') {
      result = result.filter(category => category.is_popular);
    } else if (activeFilter === 'inProgress') {
      const inProgressCategoryIds = userProgress
        .filter(progress => progress.completed_lessons > 0 && progress.completed_lessons < progress.total_lessons)
        .map(progress => progress.category_id);
      result = result.filter(category => inProgressCategoryIds.includes(category.id));
    } else if (activeFilter === 'completed') {
      const completedCategoryIds = userProgress
        .filter(progress => progress.completed_lessons === progress.total_lessons)
        .map(progress => progress.category_id);
      result = result.filter(category => completedCategoryIds.includes(category.id));
    }
    
    setFilteredCategories(result);
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id');

      if (error) {
        throw error;
      }

      const enhancedData = data?.map((category) => {
        // Burada resim kullanımını görebiliriz
        return {
          ...category,
          // Resim kullanımı nasıl olmuş bakalım
          progress: Math.floor(Math.random() * 100),
          isNew: Math.random() > 0.7,
          isPopular: Math.random() > 0.5,
        };
      });

      setCategories(enhancedData);
      setFilteredCategories(enhancedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId: number) => {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('name');

      if (error) {
        toast.error('Alt kategoriler yüklenirken bir hata oluştu');
        return;
      }

      // Alt kategorilere senaryolar ekle
      const enhancedSubcategories = data?.map((subcategory, index) => {
        const scenarios = [
          "Bir restoranda yemek siparişi veriyorsunuz.",
          "Yeni bir şehirde yol tarifi istiyorsunuz.",
          "Doktor muayenesinde sağlık sorunlarınızı anlatıyorsunuz.",
          "Bir mağazada alışveriş yapıyorsunuz.",
          "Otelde rezervasyon yaptırıyorsunuz.",
          "Toplu taşıma kullanarak şehirde dolaşıyorsunuz.",
          "Bir kafede arkadaşınızla buluşuyorsunuz.",
          "İş görüşmesinde kendinizi tanıtıyorsunuz."
        ];

        // Her kategorinin ilk alt kategorisi açık, diğerleri kilitli
        const isLocked = index !== 0;

        return {
          ...subcategory,
          scenario: scenarios[Math.floor(Math.random() * scenarios.length)],
          category_id: categoryId.toString(),
          is_locked: isLocked
        };
      }) || [];

      setSubcategories(enhancedSubcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast.error('Alt kategoriler yüklenirken bir hata oluştu');
    }
  };

  const handleCategoryClick = (category: Category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSubcategories([]);
    } else {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    // Alt kategori seçimini güncelle
    setSelectedSubcategory(subcategory);
  };

  const handleStartJourney = async () => {
    if (selectedCategory && selectedSubcategory) {
      try {
        // Kategori ve alt kategori bilgilerini localStorage'a kaydedelim
        localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
        localStorage.setItem('selectedSubcategory', JSON.stringify(selectedSubcategory));
        
        // Eğer "Sipariş Verme" alt kategorisi seçildiyse, önceden oluşturduğumuz session ID'yi kullan
        if (selectedSubcategory.name === 'Sipariş Verme') {
          console.log('Sipariş Verme alt kategorisi seçildi, önceden oluşturulan session ID kullanılıyor');
          navigate(`/speak-write/d5036e84-2693-40fd-8ec5-9e7f3efc2bb4`);
          toast.success('Konuşma oturumu başlatıldı!');
          return;
        }
        
        // Kullanıcı kimliğini al (auth kullanıyorsanız)
        // const user = supabase.auth.user();
        // const userId = user ? user.id : 'anonymous';
        
        // Geçici olarak sabit bir kullanıcı kimliği kullanıyoruz
        const userId = 'user-1';
        
        // Rastgele bir öğretmen seç
        const { data: teachersData, error: teachersError } = await supabase
          .from('teachers')
          .select('id')
          .limit(10);
          
        let teacherId = 'teacher-1'; // Varsayılan öğretmen kimliği
        
        if (!teachersError && teachersData && teachersData.length > 0) {
          // Rastgele bir öğretmen seç
          const randomIndex = Math.floor(Math.random() * teachersData.length);
          teacherId = teachersData[randomIndex].id;
        }
        
        // Yeni öğrenme oturumu oluştur
        const { data: sessionData, error: sessionError } = await supabase
          .from('learning_sessions')
          .insert([
            {
              user_id: userId,
              teacher_id: teacherId,
              category_id: selectedCategory.id,
              subcategory_id: selectedSubcategory.id,
              start_time: new Date().toISOString(),
            }
          ])
          .select();
          
        if (sessionError) {
          console.error('Error creating session:', sessionError);
          // Hata durumunda mock session ID kullan
          const mockSessionId = crypto.randomUUID();
          navigate(`/speak-write/${mockSessionId}`);
        } else if (sessionData && sessionData.length > 0) {
          // Başarılı olursa, oluşturulan oturumun ID'si ile yönlendir
          navigate(`/speak-write/${sessionData[0].id}`);
        }
        
        // Başarılı mesajı göster
        toast.success('Konuşma oturumu başlatıldı!');
      } catch (error) {
        console.error('Error starting session:', error);
        toast.error('Oturum başlatılırken bir hata oluştu');
      }
    } else {
      toast.error('Lütfen bir kategori ve alt kategori seçin');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const getCategoryProgress = (categoryId: number) => {
    const progress = userProgress.find(p => p.category_id === categoryId);
    if (!progress) return 0;
    return Math.round((progress.completed_lessons / progress.total_lessons) * 100);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  const handleTooltip = (categoryId: number | null) => {
    setShowTooltip(categoryId);
  };

  if (loading) {
    return (
      <div className="category-page loading">
        <div className="loader"></div>
        <p>Kategoriler yükleniyor...</p>
      </div>
    );
  }

  // Kategori ikonları için emoji veya simgeler
  const getCategoryIcon = (categoryName: string) => {
    const icons: {[key: string]: string} = {
      'Günlük Konuşmalar': '💬',
      'İş Hayatı': '💼',
      'Seyahat': '✈️',
      'Alışveriş': '🛒',
      'Yemek ve Restoran': '🍽️',
      'Sağlık': '🏥',
      'Eğitim': '🎓',
      'Teknoloji': '💻',
      'Spor ve Hobi': '⚽',
      'Kültür ve Sanat': '🎭'
    };
    
    return icons[categoryName] || '📚';
  };

  return (
    <div className={`category-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="category-header">
        <button className="dashboard-button" onClick={() => navigate('/')}>
          <span className="dashboard-icon">🏠</span>
          <span className="button-text">Dashboard'a Dön</span>
          <span className="button-shine"></span>
        </button>
        <p>İlgi alanlarınıza göre kategorileri keşfedin ve dil becerilerinizi geliştirin!</p>
      </div>

      <div className="learning-path-container">
        <div className="categories-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Kategori ara..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="category-list">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`category-list-item ${selectedCategory?.id === category.id ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-icon">{getCategoryIcon(category.name)}</div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <div className="category-meta">
                    {category.is_new && <span className="category-tag new">Yeni</span>}
                    {category.is_popular && <span className="category-tag popular">Popüler</span>}
                    <div className="progress-bar">
                      <div 
                        className="progress-value" 
                        style={{ width: `${category.completion_rate}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{category.completion_rate}%</span>
                  </div>
                </div>
                <div className="category-arrow">
                  {selectedCategory?.id === category.id ? '▼' : '▶'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="subcategories-content">
          {selectedCategory ? (
            <>
              <div className="selected-category-header">
                <div className="selected-category-info">
                  <div className="selected-category-icon">{getCategoryIcon(selectedCategory.name)}</div>
                  <div>
                    <h2 style={{color: '#151b45'}}>{selectedCategory.name}</h2>
                    <p style={{color: '#151b45'}}>{selectedCategory.description}</p>
                  </div>
                </div>
              </div>

              <SubcategoryPath
                subcategories={sortedSubcategories()}
                onSubcategoryClick={handleSubcategoryClick}
                selectedSubcategory={selectedSubcategory}
              />
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3 className="empty-text">Lütfen incelemek istediğiniz bir kategori seçin</h3>
              <Link to="/courses" className="empty-button">
                Tüm Kursları Görüntüle
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 