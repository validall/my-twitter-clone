export default function getTrendingTopics(tweets, limit = 5) {
  // Создаем объект для подсчета тегов
  const tagCount = {};
  
  // Считаем количество упоминаний каждого тега
  tweets.forEach(tweet => {
    if (tweet.tags && Array.isArray(tweet.tags)) {
      tweet.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });
  
  // Преобразуем в массив, сортируем и ограничиваем количество
  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, tweets: count }))
    .sort((a, b) => b.tweets - a.tweets)
    .slice(0, limit);
}