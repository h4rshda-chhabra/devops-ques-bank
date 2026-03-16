import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { getQuestions, getCategories } from '../lib/api';

function HomePage() {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [qs, cats] = await Promise.all([getQuestions(), getCategories()]);
                setQuestions(qs);
                setCategories(cats);
            } catch (err) {
                console.error('Failed to load data:', err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Hero */}
            <div className="text-center py-10">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    DevOps Interview <span className="text-blue-600">Question Bank</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Browse, search, and contribute DevOps interview questions across Docker, Kubernetes, CI/CD, and more.
                </p>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((cat) => (
                            <Link
                                key={cat._id}
                                to={`/category/${encodeURIComponent(cat.name)}`}
                                className="block p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{cat.name}</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{cat.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Latest Questions */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Questions</h2>
                    <Link to="/search" className="text-blue-600 hover:underline text-sm font-medium">
                        Search all &rarr;
                    </Link>
                </div>
                {questions.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">No questions yet. Be the first to contribute!</p>
                        <Link to="/add-question" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Add a Question
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {questions.slice(0, 9).map((q) => (
                            <QuestionCard key={q._id} question={q} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default HomePage;
