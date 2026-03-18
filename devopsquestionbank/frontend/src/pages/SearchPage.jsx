import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { getQuestions } from '../lib/api';

const COMPANIES = ['Amazon', 'Google', 'Microsoft', 'Netflix', 'Meta', 'Apple'];
const CATEGORIES = ['General', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Git', 'Networking', 'Microservices', 'Cloud', 'Monitoring', 'Security', 'Architecture', 'Containers', 'SRE'];

function SearchPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialQuery = searchParams.get('q') || '';
    const initialCompany = searchParams.get('company') || '';
    const initialCategory = searchParams.get('category') || '';

    const [query, setQuery] = useState(initialQuery);
    const [selectedCompany, setSelectedCompany] = useState(initialCompany);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        handleSearch(initialQuery, initialCompany, initialCategory);
    }, [initialQuery, initialCompany, initialCategory]);

    const handleSearch = async (searchQuery, company, category) => {
        setLoading(true);
        setError('');

        try {
            const data = await getQuestions({
                q: searchQuery || undefined,
                company: company || undefined,
                category: category || undefined
            });
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (selectedCompany) params.set('company', selectedCompany);
        if (selectedCategory) params.set('category', selectedCategory);
        navigate(`/search?${params.toString()}`);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Search Questions
                </h1>
                <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search keywords, topics, or specific services..."
                            className="w-full p-4 pl-6 pr-32 text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none shadow-sm"
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">All Companies</option>
                            {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">All Categories</option>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {loading ? 'Searching...' : `Found ${results.length} results ${initialQuery ? `for "${initialQuery}"` : ''}`}
                    </h2>
                </div>

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-50">
                        {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {results.map((q) => (
                            <QuestionCard key={q._id} question={q} />
                        ))}
                    </div>
                )}

                {!loading && results.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No questions found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
