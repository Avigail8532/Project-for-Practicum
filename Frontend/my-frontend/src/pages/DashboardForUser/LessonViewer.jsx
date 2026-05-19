import { styles } from './styles';

const LessonViewer = ({ aiLesson, selectedSubCategory, onBack }) => (
    <div style={styles.lessonBox}>
        <button style={styles.backButton} onClick={onBack}>⬅️ Back to topic selection</button>
        <h2>📚 The topic you wanted to delve into: {selectedSubCategory?.name}</h2>
        <div style={styles.lessonContent}>{aiLesson}</div>
    </div>
);
export default LessonViewer;