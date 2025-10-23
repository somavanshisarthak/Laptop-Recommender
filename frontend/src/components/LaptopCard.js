import React from 'react';

const LaptopCard = ({ laptop, rank }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      {/* Header with rank */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRankColor(rank)}`}>
            {getRankIcon(rank)} Rank #{rank}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(laptop.price)}
            </div>
            <div className="text-sm text-gray-500">Use Case: {laptop.use_case}</div>
          </div>
        </div>
      </div>

      {/* Laptop Details */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{laptop.name}</h3>
        
        <div className="space-y-3">
          {/* CPU */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 text-sm">💻</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Processor</div>
              <div className="text-sm text-gray-600">{laptop.cpu}</div>
            </div>
          </div>

          {/* GPU */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 text-sm">🎮</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Graphics</div>
              <div className="text-sm text-gray-600">{laptop.gpu}</div>
            </div>
          </div>

          {/* RAM */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 text-sm">🧠</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Memory</div>
              <div className="text-sm text-gray-600">{laptop.ram} GB RAM</div>
            </div>
          </div>

          {/* Storage */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-orange-600 text-sm">💾</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Storage</div>
              <div className="text-sm text-gray-600">{laptop.storage} GB SSD</div>
            </div>
          </div>
        </div>

        {/* Value Score */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Value Score</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.min(5, Math.floor((laptop.ram + laptop.storage / 100) / laptop.price * 1000))
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
