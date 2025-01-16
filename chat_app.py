import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def chat_with_gpt(prompt):
    try:
        # Create a chat completion
        response = client.chat.completions.create(
            model="o1-mini", messages=[{"role": "user", "content": prompt}]
        )

        # Return the response
        return response.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {str(   e)}"


class ChatSession:
    def __init__(self):
        self.is_active = True
        
    def get_user_input(self):
        return input("\nYou: ").strip()
    
    def handle_input(self, user_input):
        if user_input.lower() == 'quit':
            self.is_active = False
            print("Goodbye!")
            return False
        return True
    
    def run(self):
        print("Welcome to ChatGPT CLI!")
        print("Type 'quit' to exit")
        
        while self.is_active:
            user_input = self.get_user_input()
            if self.handle_input(user_input):
                response = chat_with_gpt(user_input)
                print("\nChatGPT:", response)

def main():
    session = ChatSession()
    session.run()


if __name__ == "__main__":
    main()
