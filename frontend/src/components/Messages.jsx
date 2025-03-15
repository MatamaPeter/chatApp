import PropTypes from "prop-types";

function Messages({ userImg, username, time, message, unreadCount }) {
  return (
   <div className="user-msg-info">
        <div className="user-img">
          <img src={userImg} alt="User Profile" />
        </div>

        <div className="msg-content">
          <div className="username-time">
            <h3>{username}</h3>
            <h6>{time}</h6>
          </div>
          <div className="message-counter">
            <span>{message}</span>
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
          </div>
        </div>
    </div>
  );
}

// ✅ Adding PropTypes for ESLint compliance
Messages.propTypes = {
  userImg: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  unreadCount: PropTypes.number.isRequired,
};

export default Messages;
