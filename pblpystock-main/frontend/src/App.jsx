import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AddQuestionPage from './pages/AddQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import CategoryQuestionsPage from './pages/CategoryQuestionsPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Navigation />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/add-question" element={<AddQuestionPage />} />
                        <Route path="/question/:id" element={<QuestionDetailPage />} />
                        <Route path="/category/:name" element={<CategoryQuestionsPage />} />
                    </Routes>
                </main>
                <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8">
                    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} DevOps Interview Question Bank. Prepared for users like you.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
