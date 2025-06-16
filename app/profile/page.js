'use client';

import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [tweets, setTweets] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  // Замените '1' на актуальный userId, если потребуется
  const userId = '1';

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    const res = await fetch('/api/tweets');
    const data = await res.json();
    setTweets((data.tweets || []).filter(t => t.userId === userId));
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить твит?')) return;
    await fetch(`/api/tweets/${id}`, { method: 'DELETE' });
    fetchTweets();
  };

  const handleEdit = (tweet) => {
    setEditId(tweet.id);
    setEditTitle(tweet.title);
    setEditBody(tweet.body);
  };

  const handleEditSave = async () => {
    await fetch(`/api/tweets/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, body: editBody, userId }),
    });
    setEditId(null);
    fetchTweets();
  };

  return (
    <div className="max-w-xl mx-auto mt-8 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">My Tweets</h1>
      {tweets.length === 0 && <div>No Tweets</div>}
      {tweets.map(tweet =>
        editId === tweet.id ? (
          <div key={tweet.id} className="border p-4 mb-4 rounded dark:border-gray-700 dark:bg-gray-800">
            <input
              className="border p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="border p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={editBody}
              onChange={e => setEditBody(e.target.value)}
              placeholder="Text"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleEditSave}>
              Save
            </button>
            <button className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2 rounded" onClick={() => setEditId(null)}>
              Cancel
            </button>
          </div>
        ) : (
          <div key={tweet.id} className="border p-4 mb-4 rounded dark:border-gray-700 dark:bg-gray-800">
            <div className="font-bold">{tweet.title}</div>
            <div className="mb-2">{tweet.body}</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleEdit(tweet)}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(tweet.id)}>
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
}