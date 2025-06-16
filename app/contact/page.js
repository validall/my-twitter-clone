export default function ContactPage() {
  return (
    <div className="p-8 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p>This is the Contact page for our Twitter clone.</p>
      <div className="mt-4">
        <p>You can reach us at:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Email: example@twitter-clone.com</li>
          <li>Twitter: @twitterclone</li>
          
        </ul>
      </div>
    </div>
  );
}