import React, { useState } from "react";
import axios from "axios";

// Starfield background component
const Starfield = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    style={{
      background: `radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)`,
      minHeight: '100vh',
      width: '100vw',
    }}
  >
    {/* Generate 100 random stars */}
    {Array.from({ length: 100 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.5;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'white',
            opacity,
            filter: 'blur(0.5px)',
          }}
        />
      );
    })}
  </div>
);

const AnimatedCSVAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setShowResults(false);
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Change label 'Positive' to 'Real' in results
      if (response.data && response.data.reviews) {
        response.data.reviews = response.data.reviews.map(r => ({
          ...r,
          label: r.label === 'Positive' ? 'Real' : r.label
        }));
      }
      setResult(response.data);
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setShowResults(false);
    if (document.getElementById("fileInput")) {
      document.getElementById("fileInput").value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-mono relative">
      <Starfield />
      <div className="relative z-10 w-full max-w-4xl p-10 flex flex-col items-center border border-gray-700 rounded-2xl shadow-lg mt-8 mb-8 bg-transparent">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">Fake Review Detector</h1>
        <p className="text-gray-400 mb-8 text-center text-base">Upload a CSV file of product reviews to analyze for fake reviews using AI.</p>
        {/* Minimalist custom file input */}
        <div className="mb-4 w-full flex flex-col items-center">
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="px-5 py-2 border border-gray-700 rounded bg-transparent text-white font-semibold cursor-pointer hover:bg-gray-900 transition-all duration-200 text-sm"
            tabIndex={0}
          >
            Choose CSV File
          </label>
          {file && (
            <span className="mt-2 text-gray-400 text-xs truncate max-w-full">{file.name}</span>
          )}
        </div>
        <div className="flex w-full space-x-2 mb-4">
          <button
            className={`flex-1 py-2 rounded font-bold text-white border border-gray-700 bg-transparent hover:bg-gray-900 transition-all duration-200 ${loading ? 'opacity-60' : ''}`}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze CSV"
            )}
          </button>
          <button
            className="flex-1 py-2 rounded font-bold text-gray-300 border border-gray-700 bg-transparent hover:bg-gray-900 transition-all duration-200"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-center mb-2">{error}</p>
        )}
        {result && !showResults && (
          <div className="w-full mt-6 p-6 rounded-lg border border-gray-700 bg-transparent flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-2 text-center">Analysis Summary</h2>
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 100 50" className="w-48 mb-2">
                <path d="M10,50 A40,40 0 1,1 90,50" fill="none" stroke="#333" strokeWidth="6" />
                <path
                  d="M10,50 A40,40 0 1,1 90,50"
                  fill="none"
                  stroke={result.fake_percentage > 50 ? "#FF0000" : result.fake_percentage > 25 ? "#FFA500" : "#00FF00"}
                  strokeWidth="6"
                  strokeDasharray={`${(result.fake_percentage / 100) * 125} 125`}
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="4" fill="#fff" />
                <text x="50" y="45" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">
                  {result.fake_percentage}%
                </text>
              </svg>
              <div className="text-center">
                <p className="font-semibold text-gray-300">Product ID: <span className="text-white">{result.prod_id || "N/A"}</span></p>
                <p className="font-semibold text-gray-300">Product Name: <span className="text-white">{result.prod_name || "N/A"}</span></p>
                <p className="font-semibold text-gray-300">Total Reviews: <span className="text-white">{result.total_reviews}</span></p>
                <p className="font-semibold text-gray-300">Fake Reviews: <span className="text-white">{result.fake_reviews_count}</span></p>
                <p className="font-semibold text-gray-300">Fake Percentage: <span className="text-white">{result.fake_percentage}%</span></p>
              </div>
            </div>
            <button
              className="mt-6 px-6 py-2 border border-gray-700 bg-transparent text-white rounded font-bold hover:bg-gray-900 transition-all duration-200"
              onClick={() => setShowResults(true)}
            >
              See Results
            </button>
          </div>
        )}
        {result && showResults && (
          <div className="w-full mt-6 p-6 rounded-lg border border-gray-700 bg-transparent">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Review Results</h2>
            <div className="max-h-96 overflow-y-auto w-full">
              {result.reviews && result.reviews.length > 0 ? (
                result.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 p-4 rounded border flex items-center ${review.label === 'Fake' ? 'bg-gray-900 border-red-500' : 'bg-gray-800 border-green-500'}`}
                  >
                    <span className={`font-bold mr-3 text-lg ${review.label === 'Fake' ? 'text-red-400' : 'text-green-400'}`}>{review.label}</span>
                    <span className="text-gray-200">{review.text}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No reviews found.</p>
              )}
            </div>
            <button
              className="mt-6 px-6 py-2 border border-gray-700 bg-transparent text-white rounded font-bold hover:bg-gray-900 transition-all duration-200"
              onClick={() => setShowResults(false)}
            >
              Back to Summary
            </button>
          </div>
        )}
      </div>
      <footer className="w-full text-center text-gray-500 text-xs py-4 z-10 relative select-none">
        © 2025 Srihari Janardhanan and Venkata Ganapathi Subramanian
      </footer>
    </div>
  );
};

export default AnimatedCSVAnalysis;
