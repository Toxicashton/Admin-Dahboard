export default function ChatBubble({ message, sender, timestamp }) {
  return (
    <div className={`chat-bubble ${sender}`}>
      <div className="bubble-text">{message}</div>
      {timestamp && (
        <div className="bubble-time">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
