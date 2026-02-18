'use client';

import { useState } from 'react';
import { Loader2, Instagram, Facebook, Linkedin, CheckCircle2 } from 'lucide-react';

interface PublishResult {
  platform: string;
  success: boolean;
  message: string;
}

export default function TestPublisher() {
  const [content, setContent] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [results, setResults] = useState<PublishResult[]>([]);

  const publishToPlatform = async (platform: string) => {
    setPublishing(true);
    try {
      const response = await fetch(`/api/publish/${platform}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      
      setResults((prev) => [
        ...prev,
        {
          platform,
          success: response.ok,
          message: data.message || 'Published successfully',
        },
      ]);
    } catch (error) {
      setResults((prev) => [
        ...prev,
        {
          platform,
          success: false,
          message: 'Failed to publish',
        },
      ]);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Social Media Publisher
          </h1>
          <p className="text-gray-600">Test publishing to social media platforms</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content to Publish
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Enter your content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => publishToPlatform('instagram')}
            disabled={publishing || !content}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Instagram className="w-5 h-5" />
            )}
            Instagram
          </button>

          <button
            onClick={() => publishToPlatform('facebook')}
            disabled={publishing || !content}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Facebook className="w-5 h-5" />
            )}
            Facebook
          </button>

          <button
            onClick={() => publishToPlatform('linkedin')}
            disabled={publishing || !content}
            className="flex items-center justify-center gap-2 bg-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Linkedin className="w-5 h-5" />
            )}
            LinkedIn
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Publishing Results</h3>
            <div className="space-y-3">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 ${
                    result.success
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {result.success ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-red-600" />
                    )}
                    <div>
                      <div className="font-semibold capitalize text-gray-800">
                        {result.platform}
                      </div>
                      <div className="text-sm text-gray-600">{result.message}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
