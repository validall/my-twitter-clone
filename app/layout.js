import './globals.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import TrendingTopics from './components/TrendingTopics'
import getTrendingTopics from './utils/getTrendingTopics'

// Функция для получения твитов
async function getTweets() {
  try {
    const res = await fetch('https://dummyjson.com/posts?limit=50', { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch tweets')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching tweets:', error)
    return { posts: [] }
  }
}

export default async function RootLayout({ children }) {
  // Получаем твиты для анализа трендов
  const { posts } = await getTweets()
  
  // Вычисляем тренды на основе тегов
  const trendingTopics = getTrendingTopics(posts)
  
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 border-x border-gray-200 dark:border-gray-700">
              {children}
            </main>
            <Footer />
          </div>
          <div className="hidden lg:block w-80 p-4">
            <TrendingTopics topics={trendingTopics} />
          </div>
        </div>
      </body>
    </html>
  )
}