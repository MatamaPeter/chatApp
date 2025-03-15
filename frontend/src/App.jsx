import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMoreVertical, FiMic, FiVideo, FiPhone } from "react-icons/fi";
import { FaSearch, FaPaperclip, FaUser, FaUserFriends, FaHeart, FaEllipsisH } from "react-icons/fa";
import { BsEmojiSmile, BsArrowLeft } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const users = [
  { 
    id: 1, 
    name: "Lisa Roy", 
    position: "UX Designer",
    lastMessage: "Hi, are you available tomorrow?", 
    time: "10:35 AM", 
    unread: 1,
    avatar: "https://i.pravatar.cc/150?img=1",
    online: true
  },
  { 
    id: 2, 
    name: "Jamie Taylor", 
    position: "Project Manager",
    lastMessage: "Nice one.", 
    time: "Yesterday", 
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=2",
    online: true
  },
  { 
    id: 3, 
    name: "Jason Roy", 
    position: "Senior Developer",
    lastMessage: "Looking forward to the project!", 
    time: "Mon", 
    unread: 2,
    avatar: "https://i.pravatar.cc/150?img=3",
    online: false
  },
  { 
    id: 4, 
    name: "Sarah Johnson", 
    position: "Marketing Lead",
    lastMessage: "The presentation looks great!", 
    time: "Sun", 
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=4",
    online: false
  },
  { 
    id: 5, 
    name: "Michael Chen", 
    position: "Backend Developer",
    lastMessage: "Can you check the API documentation?", 
    time: "Fri", 
    unread: 3,
    avatar: "https://i.pravatar.cc/150?img=5",
    online: true
  },
];

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: selectedUser.name, text: "Hi, have you got the project report?", time: "10:30 AM", status: "read" },
    { id: 2, sender: "You", text: "Not yet, I'm still finalizing some details.", time: "10:31 AM", status: "read" },
    { id: 3, sender: selectedUser.name, text: "When do you think you'll be done?", time: "10:32 AM", status: "read" },
    { id: 4, sender: "You", text: "Should be ready by end of day. I'll send it over as soon as it's done.", time: "10:35 AM", status: "sent" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobile, setShowMobile] = useState(null); // null: both, "sidebar": only sidebar, "chat": only chat
  const messagesEndRef = useRef(null);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Get time in 12 hour format
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { 
      id: messages.length + 1, 
      sender: "You", 
      text: newMessage, 
      time: getCurrentTime(),
      status: "sent" 
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate reply after 1-3 seconds
    setTimeout(() => {
      const replies = [
        "Got it, thanks!",
        "That sounds good.",
        "Perfect, I appreciate it.",
        "Thanks for letting me know.",
        "Great, looking forward to it."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: selectedUser.name,
        text: randomReply,
        time: getCurrentTime(),
        status: "delivered"
      }]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <AnimatePresence>
        {(showMobile === null || showMobile === "sidebar") && (
          <motion.aside 
            initial={{ x: showMobile === "sidebar" ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-1/4 bg-white shadow-md z-10 flex flex-col h-full"
          >
            {/* User Profile */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <FaUser />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-bold">David Peters</h2>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
              <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                <FiMoreVertical />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative p-4">
              <FaSearch className="absolute left-7 top-7 text-gray-400" />
              <input 
                type="text" 
                className="w-full pl-10 p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                placeholder="Search conversations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Chats</h3>
              {filteredUsers.map(user => (
                <motion.div 
                  key={user.id} 
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${selectedUser.id === user.id ? 'border-indigo-500 bg-indigo-50' : 'border-transparent'}`}
                  onClick={() => {
                    setSelectedUser(user);
                    if (window.innerWidth < 768) setShowMobile("chat");
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    {user.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <span className="text-xs text-gray-500">{user.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate w-40">{user.lastMessage}</p>
                  </div>
                  {user.unread > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      {user.unread}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {(showMobile === null || showMobile === "chat") && (
          <motion.main 
            className="flex-1 flex flex-col bg-white shadow-md relative h-full"
            initial={{ x: showMobile === "chat" ? 300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat Header */}
            <header className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center">
                {showMobile === "chat" && (
                  <button 
                    className="mr-3 p-2 rounded-full hover:bg-gray-100 md:hidden"
                    onClick={() => setShowMobile("sidebar")}
                  >
                    <BsArrowLeft size={20} />
                  </button>
                )}
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="ml-3">
                  <h2 className="font-bold">{selectedUser.name}</h2>
                  <p className="text-xs text-gray-500">{selectedUser.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <FiPhone size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <FiVideo size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <FaEllipsisH size={20} />
                </button>
              </div>
            </header>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="max-w-3xl mx-auto">
                {/* Date Separator */}
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">Today</span>
                </div>
                
                {messages.map((msg, index) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} mb-4`}
                  >
                    {msg.sender !== "You" && (
                      <img src={selectedUser.avatar} alt={selectedUser.name} className="w-8 h-8 rounded-full mr-2 self-end" />
                    )}
                    <div className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md break-words ${
                      msg.sender === "You" 
                        ? "bg-indigo-600 text-white rounded-br-none" 
                        : "bg-white shadow-sm text-gray-800 rounded-bl-none"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <div className={`text-xs mt-1 flex items-center ${msg.sender === "You" ? "justify-end" : ""}`}>
                        <span className={msg.sender === "You" ? "text-indigo-200" : "text-gray-500"}>
                          {msg.time}
                        </span>
                        {msg.sender === "You" && (
                          <span className="ml-1 text-indigo-200">
                            <IoCheckmarkDoneOutline size={16} />
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Message Input */}
            <footer className="p-4 border-t bg-white sticky bottom-0">
              <div className="flex items-center bg-gray-100 rounded-2xl px-3 py-2">
                <button className="p-2 text-gray-500 hover:text-indigo-600">
                  <BsEmojiSmile size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-indigo-600">
                  <FaPaperclip size={20} />
                </button>
                <textarea
                  rows="1"
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none px-2 py-1 max-h-32"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {newMessage ? (
                  <button 
                    onClick={sendMessage} 
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    <FiSend size={20} />
                  </button>
                ) : (
                  <button className="p-2 text-gray-500 hover:text-indigo-600">
                    <FiMic size={20} />
                  </button>
                )}
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Right Sidebar - Profile */}
      <aside className="hidden lg:block w-1/4 bg-white shadow-md p-6 border-l">
                <div className="flex flex-col items-center text-center">
          <img src={selectedUser.avatar} alt={selectedUser.name} className="w-24 h-24 rounded-full object-cover mb-4" />
          <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
          <p className="text-gray-500">{selectedUser.position}</p>
          <span className={`mt-2 text-sm font-medium ${selectedUser.online ? "text-green-500" : "text-gray-400"}`}>
            {selectedUser.online ? "Online" : "Offline"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
            <FiPhone size={20} />
          </button>
          <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
            <FiVideo size={20} />
          </button>
          <button className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
            <FaEllipsisH size={20} />
          </button>
        </div>

        {/* User Details */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500">Contact Info</h3>
          <p className="mt-1 text-gray-700">{selectedUser.name}@example.com</p>
          <p className="text-gray-700">+123 456 7890</p>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500">About</h3>
          <p className="mt-1 text-gray-700">"Let's make work fun and productive!"</p>
        </div>
      </aside>
    </div>
  );
}