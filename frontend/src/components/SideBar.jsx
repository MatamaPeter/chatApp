function SideBar() {
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

      <hr />

      {/* User Messages Section */}
      <div className="user-msg">
        <div className="user-msg-info">
          <div className="user-img">
            <img src="messanger.jpg" alt="User Profile" />
          </div>
          <div className="msg-content">
            <h3>John Doe</h3>
            <span>Hi, How are you?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
