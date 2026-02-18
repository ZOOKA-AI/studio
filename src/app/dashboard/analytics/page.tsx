'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

interface AnalyticsData {
  platform: string;
  impressions: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([
    {
      platform: 'Instagram',
      impressions: 15420,
      engagement: 8.5,
      likes: 1240,
      comments: 89,
      shares: 156,
    },
    {
      platform: 'Facebook',
      impressions: 12350,
      engagement: 6.2,
      likes: 890,
      comments: 67,
      shares: 123,
    },
    {
      platform: 'LinkedIn',
      impressions: 8920,
      engagement: 5.1,
      likes: 456,
      comments: 34,
      shares: 78,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Marketing Analytics
          </h1>
          <p className="text-gray-600">Track your campaign performance across platforms</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Total Impressions</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {analytics.reduce((sum, a) => sum + a.impressions, 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Avg Engagement</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {(analytics.reduce((sum, a) => sum + a.engagement, 0) / analytics.length).toFixed(1)}%
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Total Likes</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {analytics.reduce((sum, a) => sum + a.likes, 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Share2 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Total Shares</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {analytics.reduce((sum, a) => sum + a.shares, 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Platform Performance</h2>
          <div className="space-y-4">
            {analytics.map((platform) => (
              <div key={platform.platform} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{platform.platform}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {platform.engagement}% engagement
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Impressions</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {platform.impressions.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Likes</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {platform.likes.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Comments</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {platform.comments.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Share2 className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Shares</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {platform.shares.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
