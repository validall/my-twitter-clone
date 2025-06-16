import fetch from 'node-fetch';

export async function GET() {
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();
    
    return new Response(JSON.stringify(data.posts), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}