# ChatGPT CLI

This is a Command Line Interface application that interacts with OpenAI's GPT model for conversational AI. The application allows users to send prompts and receive responses directly from the terminal.

## Features
- Simple and user-friendly CLI for chatting with GPT.

## Prerequisites

Before using this project, ensure you have the following installed on your system:

- Python 3.7+
- pip
- An OpenAI API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. In`.env` file in the project directory, add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

## Usage

1. Run the application:
   ```bash
   python chat_app.py
   ```

2. Interact with the ChatGPT CLI:
   - Type a prompt and press Enter to receive a response from the GPT model.
   - Type `quit` to exit the application.

## Example

```bash
$ python chatgpt_cli.py
Welcome to ChatGPT CLI!
Type 'quit' to exit

You: Hello, how are you?

ChatGPT: I'm just a program, but I'm here to assist you! How can I help you today?

You: quit
Goodbye!
```
# gpt-chat-bot
