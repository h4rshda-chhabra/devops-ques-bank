import { Link, useLocation } from 'react-router-dom';
import { Search, PlusCircle, Layout, Home } from 'lucide-react';

function Navigation() {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Search', path: '/search', icon: Search },
        { name: 'Contribute', path: '/add-question', icon: PlusCircle },
    ];

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                                <Layout size={20} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                DevOps Prep
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === item.path
                                        ? 'text-blue-600'
                                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                    }`}
                            >
                                <item.icon size={18} />
                                <span className="hidden sm:inline">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
