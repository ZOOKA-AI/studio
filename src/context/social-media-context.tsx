'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface SocialMediaPost {
  id: string;
  content: string;
  hashtags: string[];
  scheduledDate: Date;
  type: 'reel' | 'carousel' | 'story' | 'post';
  status: 'draft' | 'scheduled' | 'published';
  images?: string[];
  performanceMetrics?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
}

export interface HashtagSet {
  id: string;
  name: string;
  hashtags: string[];
  category: 'general' | 'service' | 'location' | 'trending';
  language: 'ar' | 'en' | 'both';
}

interface SocialMediaContextType {
  posts: SocialMediaPost[];
  hashtagSets: HashtagSet[];
  addPost: (post: Omit<SocialMediaPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<SocialMediaPost>) => void;
  deletePost: (id: string) => void;
  addHashtagSet: (set: Omit<HashtagSet, 'id'>) => void;
  updateHashtagSet: (id: string, set: Partial<HashtagSet>) => void;
  deleteHashtagSet: (id: string) => void;
}

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

// Pre-populated hashtag sets for cleaning business
const defaultHashtagSets: HashtagSet[] = [
  {
    id: '1',
    name: 'خدمات التنظيف العامة',
    category: 'service',
    language: 'both',
    hashtags: [
      '#تنظيف_منازل',
      '#تنظيف_فلل',
      '#تنظيف_شقق',
      '#CleaningServices',
      '#DeepCleaning',
      '#HomeCleaning',
      '#UAE',
      '#Dubai',
      '#AbuDhabi',
      '#الامارات'
    ]
  },
  {
    id: '2',
    name: 'رويال كلين UAE',
    category: 'general',
    language: 'both',
    hashtags: [
      '#RoyalCleaningUAE',
      '#رويال_للتنظيف',
      '#تنظيف_احترافي',
      '#ProfessionalCleaning',
      '#CleanHome',
      '#SpotlessCleaning',
      '#UAECleaning',
      '#DubaiCleaning'
    ]
  },
  {
    id: '3',
    name: 'ترندنج SEO',
    category: 'trending',
    language: 'both',
    hashtags: [
      '#Explore',
      '#Viral',
      '#Trending',
      '#ForYou',
      '#InstaGood',
      '#Reels',
      '#InstagramReels',
      '#CleanTok',
      '#CleaningHacks',
      '#SatisfyingCleaning'
    ]
  },
  {
    id: '4',
    name: 'خدمات متخصصة',
    category: 'service',
    language: 'both',
    hashtags: [
      '#تنظيف_كنب',
      '#تنظيف_سجاد',
      '#تنظيف_مطابخ',
      '#SofaCleaning',
      '#CarpetCleaning',
      '#KitchenCleaning',
      '#BathroomCleaning',
      '#WindowCleaning'
    ]
  }
];

export function SocialMediaProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [hashtagSets, setHashtagSets] = useState<HashtagSet[]>(defaultHashtagSets);

  const addPost = (post: Omit<SocialMediaPost, 'id'>) => {
    const newPost: SocialMediaPost = {
      ...post,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setPosts([...posts, newPost]);
  };

  const updatePost = (id: string, updatedPost: Partial<SocialMediaPost>) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const addHashtagSet = (set: Omit<HashtagSet, 'id'>) => {
    const newSet: HashtagSet = {
      ...set,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setHashtagSets([...hashtagSets, newSet]);
  };

  const updateHashtagSet = (id: string, updatedSet: Partial<HashtagSet>) => {
    setHashtagSets(hashtagSets.map(set => set.id === id ? { ...set, ...updatedSet } : set));
  };

  const deleteHashtagSet = (id: string) => {
    setHashtagSets(hashtagSets.filter(set => set.id !== id));
  };

  return (
    <SocialMediaContext.Provider
      value={{
        posts,
        hashtagSets,
        addPost,
        updatePost,
        deletePost,
        addHashtagSet,
        updateHashtagSet,
        deleteHashtagSet,
      }}
    >
      {children}
    </SocialMediaContext.Provider>
  );
}

export function useSocialMedia() {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
}
