import { Link } from 'react-router-dom';

function QuestionCard({ question }) {
    return (
        <Link to={`/question/${question._id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                {question.category}
                            </span>
                            {question.company && (
                                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {question.company}
                                </span>
                            )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {question.difficulty || 'Medium'}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {question.question}
                    </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">View Answer &rarr;</span>
                    <div className="flex gap-1">
                        {(question.tags || []).slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default QuestionCard;
