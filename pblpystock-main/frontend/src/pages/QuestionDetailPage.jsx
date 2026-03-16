import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestion, deleteQuestion } from '../lib/api';
import { Trash2, ChevronLeft } from 'lucide-react';

function QuestionDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const data = await getQuestion(id);
                setQuestion(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await deleteQuestion(id);
                navigate('/');
            } catch (err) {
                alert('Failed to delete: ' + err.message);
            }
        }
    };

    if (loading) return <div className="text-center py-20 animate-pulse text-gray-500">Loading question details...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!question) return <div className="text-center py-20 text-gray-500">Question not found.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
                <ChevronLeft size={16} />
                Back to list
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {question.category}
                        </span>
                        {question.company && (
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                {question.company}
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Difficulty: {question.difficulty || 'Medium'}
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {question.question}
                </h1>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Answer</h2>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {question.answer}
                        </div>
                    </div>

                    {question.explanation && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Extra Context</h2>
                            <div className="p-6 border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 rounded-lg text-gray-700 dark:text-gray-300 text-sm italic">
                                {question.explanation}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-4">
                        {(question.tags || []).map(tag => (
                            <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[11px] px-3 py-1 rounded-full font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center gap-4">
                    {/* <button className="text-gray-500 hover:text-blue-600 transition-colors">
            <Edit2 size={18} />
          </button> */}
                    <button
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Question"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestionDetailPage;
