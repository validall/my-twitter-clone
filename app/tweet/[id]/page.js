import React from 'react';
import Link from 'next/link';

async function getTweet(id) {
  try {
    // Сначала пробуем получить из нашего API
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/tweets/${id}`, { next: { revalidate: 10 } });
    if (res.ok) {
      return await res.json();
    }
    
    // Если не найден, пробуем внешний API
    const externalRes = await fetch(`https://dummyjson.com/posts/${id}`);
    if (externalRes.ok) {
      return await externalRes.json();
    }
    
    throw new Error('Failed to fetch tweet');
  } catch (error) {
    console.error('Error fetching tweet:', error);
    return null;
  }
}

async function getComments(id) {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}/comments`);
    if (!res.ok) {
      throw new Error('Failed to fetch comments');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { comments: [] };
  }
}

export default async function TweetPage({ params }) {
  const tweet = await getTweet(params.id);
  const { comments = [] } = await getComments(params.id);

  if (!tweet) {
    return (
      <div className="p-4">
        <p className="text-red-500">Tweet not found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // Обработка поля reactions
  let likes = 0;
  let dislikes = 0;
  if (typeof tweet.reactions === 'object' && tweet.reactions !== null) {
    likes = tweet.reactions.likes ?? 0;
    dislikes = tweet.reactions.dislikes ?? 0;
  } else if (typeof tweet.reactions === 'number') {
    likes = tweet.reactions;
  }

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div>
            <p className="font-bold dark:text-white">User {tweet.userId}</p>
            <span className="text-gray-500 dark:text-gray-400">@user{tweet.userId}</span>
          </div>
          {tweet.timestamp && (
            <span className="text-gray-500 dark:text-gray-400 text-xs ml-auto">
              {new Date(tweet.timestamp).toLocaleString()}
            </span>
          )}
        </div>
        
        <h1 className="text-xl font-bold dark:text-white">{tweet.title}</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{tweet.body}</p>
        
        {tweet.tags && tweet.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tweet.tags.map((tag) => (
              <span key={tag} className="text-blue-500 text-sm">#{tag}</span>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex gap-4 text-gray-500 dark:text-gray-400">
          <span>👍 {likes}</span>
          {typeof tweet.reactions === 'object' && (
            <span>👎 {dislikes}</span>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2 dark:text-white">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
              <p className="font-bold dark:text-white">{comment.user?.username || 'Anonymous'}</p>
              <p className="dark:text-gray-300">{comment.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
        )}
      </div>
    </div>
  );
}