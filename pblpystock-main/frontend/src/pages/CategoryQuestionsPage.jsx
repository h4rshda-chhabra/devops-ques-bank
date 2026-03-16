import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { getCategoryQuestions } from '../lib/api';

function CategoryQuestionsPage() {
    const { name } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const data = await getCategoryQuestions(name);
                setQuestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [name]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {name} Questions
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Showing all questions in the {name} category.
                </p>
            </div>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-50">
                    {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />)}
                </div>
            ) : error ? (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {questions.map((q) => (
                        <QuestionCard key={q._id} question={q} />
                    ))}
                </div>
            )}

            {!loading && !error && questions.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No questions found in this category.</p>
                </div>
            )}
        </div>
    );
}

export default CategoryQuestionsPage;
