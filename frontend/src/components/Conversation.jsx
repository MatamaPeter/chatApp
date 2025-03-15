import PropTypes from "prop-types";
import { motion } from "framer-motion";

function Conversation({ messages = [], currentUser }) {
  return (
    <div className="conversation-container">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`message ${msg.senderId === currentUser ? "sent" : "received"}`}
        >
          <p className="message-text">{msg.text}</p>
          <span className="timestamp">{msg.time}</span>
        </motion.div>
      ))}
    </div>
  );
}


Conversation.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      senderId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default Conversation;
