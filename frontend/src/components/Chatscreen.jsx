import Conversation from "./Conversation";

function ChatScreen() {
  const currentUser = "user123"; // Example logged-in user ID

  const messages = [
    { id: 1, senderId: "user123", text: "Hey! How are you?", time: "10:45 AM" },
    { id: 2, senderId: "user456", text: "I'm good! You?", time: "10:46 AM" },
    { id: 3, senderId: "user123", text: "Doing great, thanks!", time: "10:47 AM" },
  ];

  return (
    <div className="chat-container">
      <Conversation messages={messages} currentUser={currentUser} />
    </div>
  );
}

export default ChatScreen;
