// eslint-disable react/props-type
function Messages(props) {
  return (
   <div className="user-msg-info">

        <div className="user-img">
        <img src="messanger.jpg" alt="User Profile" />
        </div>

        <div className="msg-content">
              <div className="username-time">
                  <h3>{props.username}</h3>
                  <h6>{props.time}</h6>
              </div>
              <div className="message-counter">
                  <span>{props.message}</span>
                  <div className="counter">{props.unreadCount}</div>
              </div>
        
       
        </div>
          
    </div>
  )
}

export default Messages
