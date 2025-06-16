import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'path';

// Путь к файлу с твитами (такой же, как в основном route.js)
const filePath = path.join(process.cwd(), 'data', 'tweets.json');

// Функция для чтения твитов из файла
async function readTweets() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tweets:', error);
    return { tweets: [] };
  }
}

// Функция для записи твитов в файл
async function writeTweets(tweets) {
  const data = JSON.stringify(tweets, null, 2);
  await fs.writeFile(filePath, data, 'utf8');
}

// GET запрос для получения конкретного твита по id
export async function GET(request, { params }) {
  const { id } = params;
  const tweetsData = await readTweets();
  const tweet = tweetsData.tweets.find(t => t.id === id);
  
  if (!tweet) {
    return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  }
  
  return NextResponse.json(tweet);
}

// PUT запрос для редактирования твита
export async function PUT(request, { params }) {
  const { id } = params;
  const { title, body, userId, tags } = await request.json();

  // Проверяем обязательные поля
  if (!title || !body) {
    return NextResponse.json(
      { error: "Title and body are required" },
      { status: 400 }
    );
  }

  // Получаем существующие твиты
  const tweetsData = await readTweets();
  const tweets = tweetsData.tweets || [];

  // Находим индекс твита по id
  const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

  // Если твит не найден, возвращаем ошибку
  if (tweetIndex === -1) {
    return NextResponse.json(
      { error: "Tweet not found" },
      { status: 404 }
    );
  }

  // Обновляем твит
  tweets[tweetIndex] = {
    ...tweets[tweetIndex],
    title,
    body,
    userId: userId || tweets[tweetIndex].userId,
    tags: tags || tweets[tweetIndex].tags,
    timestamp: new Date().toISOString()
  };

  // Сохраняем изменения в файл
  await writeTweets({ tweets });

  return NextResponse.json(tweets[tweetIndex]);
}

// DELETE запрос для удаления твита
export async function DELETE(request, { params }) {
  const { id } = params;

  // Получаем существующие твиты
  const tweetsData = await readTweets();
  const tweets = tweetsData.tweets || [];

  // Находим индекс твита по id
  const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

  // Если твит не найден, возвращаем ошибку
  if (tweetIndex === -1) {
    return NextResponse.json(
      { error: "Tweet not found" },
      { status: 404 }
    );
  }

  // Удаляем твит из массива
  const deletedTweet = tweets.splice(tweetIndex, 1)[0];

  // Сохраняем изменения в файл
  await writeTweets({ tweets });

  return NextResponse.json(deletedTweet);
}