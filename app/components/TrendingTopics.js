export default function TrendingTopics({ topics }) {
  if (!topics || topics.length === 0) {
    return (
      <aside className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-6">
        <h2 className="font-bold text-lg mb-4 dark:text-white">Trending Topics</h2>
        <p className="text-gray-500 dark:text-gray-400">No trending topics at the moment</p>
      </aside>
    );
  }

  return (
    <aside className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-6">
      <h2 className="font-bold text-lg mb-4 dark:text-white">Trending Topics</h2>
      <div className="space-y-3">
        {topics.map((topic, idx) => (
          <div key={idx} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
            <span className="text-blue-500 font-semibold">#{topic.name}</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{topic.tweets} tweets</p>
          </div>
        ))}
      </div>
    </aside>
  );
}