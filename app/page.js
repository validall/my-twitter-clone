'use client'

import { useState, useEffect } from 'react'
import TweetCard from './components/TweetCard'

export default function Home() {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTweet, setNewTweet] = useState({ title: '', body: '', tags: '' })
  const [submitting, setSubmitting] = useState(false)

  // Загрузка твитов
  useEffect(() => {
    async function loadTweets() {
      try {
        let localTweets = [];
        let externalTweets = [];
        
        // Загружаем локальные твиты
        try {
          const localRes = await fetch('/api/tweets');
          if (localRes.ok) {
            const data = await localRes.json();
            if (data.tweets && Array.isArray(data.tweets)) {
              localTweets = data.tweets;
            }
          }
        } catch (error) {
          console.error('Error loading local tweets:', error);
        }
        
        // Загружаем твиты из внешнего API
        try {
          const externalRes = await fetch('https://dummyjson.com/posts?limit=10');
          if (externalRes.ok) {
            const data = await externalRes.json();
            if (data.posts && Array.isArray(data.posts)) {
              externalTweets = data.posts;
            }
          }
        } catch (error) {
          console.error('Error loading external tweets:', error);
        }
        
        // Объединяем твиты из обоих источников
        const allTweets = [...localTweets, ...externalTweets];
        
        // Сортируем по времени создания (если есть timestamp)
        allTweets.sort((a, b) => {
          if (a.timestamp && b.timestamp) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
          return 0; // Если нет timestamp, сохраняем текущий порядок
        });
        
        setTweets(allTweets);
      } catch (error) {
        console.error('Failed to load tweets:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadTweets();
  }, []);

  // Отправка нового твита
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTweet.title || !newTweet.body) {
      alert('Please enter both title and body for your tweet');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const tagsArray = newTweet.tags
        ? newTweet.tags.split(',').map(tag => tag.trim())
        : [];
      
      const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTweet.title,
          body: newTweet.body,
          tags: tagsArray,
          userId: '1', // Можно заменить на реальный ID пользователя
        }),
      });
      
      if (response.ok) {
        const createdTweet = await response.json();
        setTweets([createdTweet, ...tweets]);
        setNewTweet({ title: '', body: '', tags: '' });
      } else {
        alert('Failed to create tweet');
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
      alert('An error occurred while creating the tweet');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Home</h1>
      
      <div className="mb-6 border-b pb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded-lg mb-2"
                value={newTweet.title}
                onChange={(e) => setNewTweet({...newTweet, title: e.target.value})}
                disabled={submitting}
              />
              <textarea 
                className="w-full p-2 border rounded-lg mb-2" 
                placeholder="What's happening?"
                rows="3"
                value={newTweet.body}
                onChange={(e) => setNewTweet({...newTweet, body: e.target.value})}
                disabled={submitting}
              ></textarea>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full p-2 border rounded-lg mb-2"
                value={newTweet.tags}
                onChange={(e) => setNewTweet({...newTweet, tags: e.target.value})}
                disabled={submitting}
              />
              <div className="flex justify-end mt-2">
                <button 
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Posting...' : 'Tweet'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {loading ? (
        <div className="text-center py-4">Loading tweets...</div>
      ) : (
        <div className="space-y-4">
          {tweets.length > 0 ? (
            tweets.map(tweet => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No tweets yet. Be the first to post!</div>
          )}
        </div>
      )}
    </div>
  );
}