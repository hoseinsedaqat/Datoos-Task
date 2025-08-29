const CryptoCardSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 animate-pulse"
        >
          {/* Logo + Name */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-300 rounded-full" />
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 sm:w-32 bg-gray-300 rounded" />
              <div className="h-3 w-16 sm:w-24 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Rank + Price */}
          <div className="flex gap-6 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex-1 text-center sm:text-left">
              <div className="h-3 w-10 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="h-3 w-10 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoCardSkeleton;
