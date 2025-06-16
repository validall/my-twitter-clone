# My Twitter Clone

This is a simple Twitter clone built with Next.js and Tailwind CSS. The application fetches tweets from a dummy JSON API and displays them in a user-friendly interface.

## Project Structure

```
my-twitter-clone
├── app
│   ├── layout.js          # Main layout of the application
│   ├── page.js            # Entry point for the application
│   ├── components         # Contains reusable components
│   │   ├── Navbar.js      # Navigation bar component
│   │   ├── Sidebar.js     # Left sidebar component
│   │   ├── RightPanel.js  # Right panel component
│   │   ├── Footer.js      # Footer component
│   │   └── TweetCard.js   # Component to display individual tweets
│   ├── api
│   │   └── posts
│   │       └── route.js   # API route to fetch posts
│   └── globals.css        # Global styles
├── public
│   └── assets             # Static assets (images, icons, etc.)
├── next.config.js         # Next.js configuration
├── package.json           # npm configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-twitter-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- The application displays a list of tweets fetched from the [Dummy JSON API](https://dummyjson.com/posts).
- The Navbar at the top provides navigation links.
- The Sidebar on the left can contain additional links or information.
- The Right Panel can include advertisements or other content.
- The Footer at the bottom contains copyright information or additional links.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.