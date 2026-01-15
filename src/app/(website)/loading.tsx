export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-surface-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-lg font-medium text-surface-600">Loading...</p>
        <p className="text-sm text-surface-400 mt-1">Please wait a moment</p>
      </div>
    </div>
  );
}
