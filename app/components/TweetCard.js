import Link from 'next/link';

export default function TweetCard({ tweet }) {
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
        <Link
            href={`/tweet/${tweet.id}`}
            className="block bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <p className="font-bold dark:text-white">User {tweet.userId}</p>
                        <span className="text-gray-500 dark:text-gray-400">@user{tweet.userId}</span>
                        {tweet.timestamp && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                                {new Date(tweet.timestamp).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <p className="mt-1 dark:text-white">{tweet.title}</p>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{tweet.body}</p>
                    
                    {/* Добавляем теги, если они есть */}
                    {tweet.tags && tweet.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {tweet.tags.map(tag => (
                                <span key={tag} className="text-blue-500 text-sm">#{tag}</span>
                            ))}
                        </div>
                    )}
                    
                    <div className="mt-2 flex gap-4 text-gray-500 dark:text-gray-400">
                        <span>👍 {likes}</span>
                        {typeof tweet.reactions === 'object' && (
                            <span>👎 {dislikes}</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}