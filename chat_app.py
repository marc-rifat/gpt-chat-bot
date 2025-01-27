import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize Flask app
app = Flask(__name__)


def chat_with_gpt(prompt):
    try:
        # Create a chat completion
        response = client.chat.completions.create(
            model="o1-mini", messages=[{"role": "user", "content": prompt}]
        )
        # Return the response
        return response.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {str(e)}"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    response = chat_with_gpt(user_message)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
