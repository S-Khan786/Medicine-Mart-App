interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-6">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        <button 
          className={`flex-1 py-3 font-medium ${
            activeTab === 'login' 
              ? 'bg-blue-600 text-white font-bold' 
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => onTabChange('login')}
        >
          Login
        </button>
        <button 
          className={`flex-1 py-3 font-medium ${
            activeTab === 'signup' 
              ? 'bg-blue-600 text-white font-bold' 
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => onTabChange('signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;
