import SubcategoryPath from '../components/SubcategoryPath';

        <div className="subcategories-content">
          {selectedCategory ? (
            <>
              <div className="selected-category-header">
                <div className="selected-category-info">
                  <div className="selected-category-icon">{getCategoryIcon(selectedCategory.name)}</div>
                  <div>
                    <h2>{selectedCategory.name}</h2>
                    <p>{selectedCategory.description}</p>
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