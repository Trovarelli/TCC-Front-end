import Spinner from '../Spinner/component';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex h-screen w-full justify-center items-center flex-col gap-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="relative">
        {}
        <div className="absolute inset-0 -m-12">
          <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        
        {}
        <div className="relative">
          <Spinner color="primary" size="lg" />
        </div>
      </div>

      {message && (
        <div className="text-center">
          <p className="text-lg text-gray-700 font-medium animate-pulse">
            {message}
          </p>
          <div className="flex gap-1 justify-center mt-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

