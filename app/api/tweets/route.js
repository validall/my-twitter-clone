import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'path';

// Path to tweets file
const filePath = path.join(process.cwd(), 'data', 'tweets.json');

// Read tweets from file
async function readTweets() {
  try {
    // Check directory exists
    try {
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    } catch (err) {
      // Ignore if directory exists
    }
    
    // Check file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      // Create empty file if not exists
      await fs.writeFile(filePath, JSON.stringify({ tweets: [] }, null, 2), 'utf8');
      return { tweets: [] };
    }
    
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tweets:', error);
    return { tweets: [] };
  }
}

// Write tweets to file
async function writeTweets(tweets) {
  const data = JSON.stringify(tweets, null, 2);
  await fs.writeFile(filePath, data, 'utf8');
}

// GET all tweets
export async function GET() {
  const tweets = await readTweets();
  return NextResponse.json(tweets);
}

// POST new tweet
export async function POST(request) {
  const { title, body, userId, tags } = await request.json();
  
  // Validate required fields
  if (!title || !body) {
    return NextResponse.json(
      { error: "Title and body are required" },
      { status: 400 }
    );
  }
  
  const tweets = await readTweets();
  
  // Create new tweet
  const newTweet = {
    id: Date.now().toString(),
    title,
    body,
    userId: userId || '1', // Default userId is 1
    tags: tags || [],
    reactions: 0,
    timestamp: new Date().toISOString()
  };
  
  tweets.tweets = [newTweet, ...(tweets.tweets || [])];
  await writeTweets(tweets);
  
  return NextResponse.json(newTweet, { status: 201 });
}

// PUT update tweet
export async function PUT(request, { params }) {
  const { id } = params;
  const { title, body, userId, tags } = await request.json();

  if (!title || !body) {
    return NextResponse.json(
      { error: "Title and body are required" },
      { status: 400 }
    );
  }

  const tweetsData = await readTweets();
  const tweets = tweetsData.tweets;

  const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

  if (tweetIndex === -1) {
    return NextResponse.json(
      { error: "Tweet not found" },
      { status: 404 }
    );
  }

  tweets[tweetIndex] = {
    ...tweets[tweetIndex],
    title,
    body, 
    userId: userId || '1',
    tags: tags || [],
    timestamp: new Date().toISOString()
  };

  await writeTweets({ tweets });

  return NextResponse.json(tweets[tweetIndex], { status: 200 });
}

// DELETE tweet
export async function DELETE(request, { params }) {
  const { id } = params;

  const tweetsData = await readTweets();
  const tweets = tweetsData.tweets;

  const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

  if (tweetIndex === -1) {
    return NextResponse.json(
      { error: "Tweet not found" },
      { status: 404 }
    );
  }

  tweets.splice(tweetIndex, 1);
  await writeTweets({ tweets });

  return NextResponse.json({ message: "Tweet deleted" }, { status: 200 });
}