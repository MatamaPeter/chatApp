import Messages from "./Messages";

function SideBar() {
  // Example user messages (Replace with real data later)
  const userMessages = [
    { id: 1, userImg: "user1.jpg", username: "Alice", time: "9:15 AM", message: "Hey! How's it going?", unreadCount: 2 },
    { id: 2, userImg: "user1.jpg", username: "Bob", time: "10:30 AM", message: "Let's catch up later.", unreadCount: 1 },
    { id: 3, userImg: "user2.jpg", username: "Charlie", time: "Yesterday", message: "See you soon!", unreadCount: 0 },
  ];

  return (
    <div className="sidebar-container">
      {/* User Details Section */}
      <div className="user-dtls">
        <div className="user-img">
          <img src="user.jpeg" alt="User Profile" />
        </div>
        <div className="name-title">
          <h3>John Doe</h3>
          <span>Software Developer</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="search" name="search-messages" id="search-bar" placeholder="Search messages..." />
      </div>

      <hr className="divider" />

      {/* User Messages Section */}
      <div className="user-msg">
        {userMessages.map((msg) => (
          <Messages 
            key={msg.id}
            userImg={msg.userImg}
            username={msg.username}
            time={msg.time}
            message={msg.message}
            unreadCount={msg.unreadCount}
          />
          
        ))}
      </div>
    </div>
  );
}

export default SideBar;
