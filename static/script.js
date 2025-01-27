// Configure marked options
marked.setOptions({
    highlight: function (code, language) {
        if (language && hljs.getLanguage(language)) {
            return hljs.highlight(code, { language: language }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

// Load chat history from localStorage
function loadChatHistory() {
    const chatHistory = localStorage.getItem('chatHistory');
    if (chatHistory) {
        const messages = JSON.parse(chatHistory);
        const chatMessages = document.getElementById('chat-messages');
        // Clear default welcome message
        chatMessages.innerHTML = '';
        messages.forEach(msg => {
            addMessage(msg.content, msg.isUser, false);
        });
    }
}

function saveChatHistory(message, isUser) {
    let chatHistory = localStorage.getItem('chatHistory');
    let messages = chatHistory ? JSON.parse(chatHistory) : [];
    messages.push({ content: message, isUser });
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}

function addMessage(message, isUser, save = true) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    if (isUser) {
        messageDiv.textContent = message;
    } else {
        // Parse markdown for bot messages
        messageDiv.innerHTML = marked.parse(message);
        // Apply syntax highlighting to code blocks
        messageDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Save message to localStorage if save is true
    if (save) {
        saveChatHistory(message, isUser);
    }
}

async function sendMessage() {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value.trim();

    if (!message) return;

    // Add user message to chat
    addMessage(message, true);
    inputElement.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Add bot response to chat
        addMessage(data.response, false);
    } catch (error) {
        addMessage('Error: Could not send message', false);
    }
}

// Allow Enter key to send messages
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add clear chat button to header
function addClearButton() {
    const headerContent = document.querySelector('.header-content');
    const clearButton = document.createElement('button');
    clearButton.className = 'clear-chat';
    clearButton.innerHTML = '<i class="fas fa-trash"></i>';
    clearButton.title = 'Clear Chat History';
    clearButton.onclick = clearChat;
    headerContent.appendChild(clearButton);
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        localStorage.removeItem('chatHistory');
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <h2>Welcome! 👋</h2>
                <p>How can I help you today?</p>
            </div>
        `;
    }
}

// Load chat history when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
    addClearButton();
}); 
