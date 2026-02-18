'use client';

/**
 * @fileOverview Context for managing social media content and scheduling
 * 
 * Manages social media posts, scheduling, and publishing queue
 */

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'snapchat' | 'whatsapp';

export interface SocialMediaPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  hashtags: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  scheduledTime?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  analytics?: {
    views?: number;
    likes?: number;
    shares?: number;
    comments?: number;
    engagement?: number;
  };
}

export interface SocialMediaConfig {
  platform: SocialPlatform;
  enabled: boolean;
  accessToken?: string;
  profileUrl?: string;
  autoPost: boolean;
}

interface ContentSchedulerContextType {
  posts: SocialMediaPost[];
  configs: SocialMediaConfig[];
  addPost: (post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, updates: Partial<SocialMediaPost>) => void;
  deletePost: (id: string) => void;
  schedulePost: (id: string, scheduledTime: Date) => void;
  publishPost: (id: string) => Promise<void>;
  updateConfig: (platform: SocialPlatform, config: Partial<SocialMediaConfig>) => void;
  getPostsByPlatform: (platform: SocialPlatform) => SocialMediaPost[];
  getScheduledPosts: () => SocialMediaPost[];
  getDraftPosts: () => SocialMediaPost[];
}

const ContentSchedulerContext = createContext<ContentSchedulerContextType | undefined>(undefined);

const STORAGE_KEY = 'contentScheduler';
const CONFIG_STORAGE_KEY = 'socialMediaConfigs';

export function ContentSchedulerProvider({children}: {children: ReactNode}) {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [configs, setConfigs] = useState<SocialMediaConfig[]>([
    {platform: 'facebook', enabled: true, profileUrl: 'https://www.facebook.com/share/1D2Dppyjux/', autoPost: false},
    {platform: 'instagram', enabled: true, profileUrl: 'https://www.instagram.com/royal_cleaning_uae', autoPost: false},
    {platform: 'linkedin', enabled: true, profileUrl: 'https://www.linkedin.com/in/شركه-رويال-للتنظيف-والتعقيم-ومكافحه-الحشرات-🐜🦗👌-3a1186226', autoPost: false},
    {platform: 'tiktok', enabled: true, profileUrl: 'https://www.tiktok.com/@royal_cleaning_uae', autoPost: false},
    {platform: 'snapchat', enabled: true, profileUrl: 'https://www.snapchat.com/add/royalcleane_uae', autoPost: false},
    {platform: 'whatsapp', enabled: true, profileUrl: 'https://wa.me/971563177803', autoPost: false},
  ]);

  useEffect(() => {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
      const parsed = JSON.parse(storedPosts);
      setPosts(parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
        scheduledTime: p.scheduledTime ? new Date(p.scheduledTime) : undefined,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : undefined,
      })));
    }

    const storedConfigs = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (storedConfigs) {
      setConfigs(JSON.parse(storedConfigs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs));
  }, [configs]);

  const addPost = (post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: SocialMediaPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPosts(prev => [...prev, newPost]);
  };

  const updatePost = (id: string, updates: Partial<SocialMediaPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? {...post, ...updates, updatedAt: new Date()} : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const schedulePost = (id: string, scheduledTime: Date) => {
    updatePost(id, {scheduledTime, status: 'scheduled'});
  };

  const publishPost = async (id: string) => {
    // Simulate publishing - in production, this would call actual social media APIs
    updatePost(id, {
      status: 'published',
      publishedAt: new Date(),
    });
  };

  const updateConfig = (platform: SocialPlatform, config: Partial<SocialMediaConfig>) => {
    setConfigs(prev => prev.map(c => 
      c.platform === platform ? {...c, ...config} : c
    ));
  };

  const getPostsByPlatform = (platform: SocialPlatform) => {
    return posts.filter(post => post.platform === platform);
  };

  const getScheduledPosts = () => {
    return posts.filter(post => post.status === 'scheduled');
  };

  const getDraftPosts = () => {
    return posts.filter(post => post.status === 'draft');
  };

  return (
    <ContentSchedulerContext.Provider
      value={{
        posts,
        configs,
        addPost,
        updatePost,
        deletePost,
        schedulePost,
        publishPost,
        updateConfig,
        getPostsByPlatform,
        getScheduledPosts,
        getDraftPosts,
      }}
    >
      {children}
    </ContentSchedulerContext.Provider>
  );
}

export function useContentScheduler() {
  const context = useContext(ContentSchedulerContext);
  if (!context) {
    throw new Error('useContentScheduler must be used within ContentSchedulerProvider');
  }
  return context;
}
