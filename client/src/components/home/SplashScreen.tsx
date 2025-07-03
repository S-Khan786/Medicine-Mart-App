const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white splash-animation">
      <div className="text-center">
        <div className="inline-flex flex-col items-center">
          <svg className="w-24 h-24 mb-4 text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6h-4V2H9v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 2h2v2h-2V8zm0 4h2v6h-2v-6zM9 4h6v2H9V4z"/>
          </svg>
          <h1 className="text-3xl font-bold text-primary-500 font-heading">MediQuick</h1>
          <p className="text-gray-600 mt-2">Your Health, Delivered</p>
          <div className="mt-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary-300 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse delay-100"></div>
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
