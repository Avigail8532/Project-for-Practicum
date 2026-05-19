
import { styles } from './styles';

const CategorySelector = ({ categories, onCategoryClick }) => (
    <div>
        <h2 style={{ textAlign: 'right', marginBottom: '20px' }}>What field are you interested in studying today?</h2>
        <div style={styles.cardsGrid}>
            {categories.map((cat) => (
                <div key={cat.id || cat._id} style={styles.card} onClick={() => onCategoryClick(cat)}>
                    <span style={{ fontSize: '40px' }}>{cat.icon || '📖'}</span>
                    <h3>{cat.name}</h3>
                </div>
            ))}
        </div>
    </div>
);
export default CategorySelector;