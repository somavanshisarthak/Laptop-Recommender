import React, { useState } from 'react';
import LaptopCard from './components/LaptopCard';

function App() {
  const [budget, setBudget] = useState('');
  const [useCase, setUseCase] = useState('');
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const useCases = [
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Office', label: 'Office Work' },
    { value: 'Student', label: 'Student' },
    { value: 'Artistic', label: 'Artistic/Creative' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!budget || !useCase) {
      setError('Please fill in all fields');
      return;
    }

    if (budget <= 0) {
      setError('Budget must be greater than 0');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5001/recommend?budget=${budget}&type=${encodeURIComponent(useCase)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setLaptops([]);
      } else {
        setLaptops(data.laptops || []);
        setMessage(data.message || '');
        setError('');
      }
    } catch (err) {
      setError(`Failed to fetch recommendations: ${err.message}`);
      setLaptops([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🖥️ Laptop Recommender
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect laptop for your needs and budget
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget Input */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your budget"
                  min="1"
                />
              </div>

              {/* Use Case Dropdown */}
              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
                  Use Case
                </label>
                <select
                  id="useCase"
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your use case</option>
                  {useCases.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-6 rounded-md transition duration-200 ease-in-out"
              >
                {loading ? 'Finding Recommendations...' : 'Get Recommendations'}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <div className="mt-2 text-sm text-green-700">{message}</div>
              </div>
            </div>
          </div>
        )}

        {/* Laptop Recommendations */}
        {laptops.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🎯 Top {laptops.length} Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laptops.map((laptop, index) => (
                <LaptopCard key={index} laptop={laptop} rank={index + 1} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {laptops.length === 0 && !loading && !error && budget && useCase && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No laptops found</h3>
            <p className="text-gray-600">
              Try adjusting your budget or use case to find more options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
