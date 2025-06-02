from flask import Flask
from flask_cors import CORS
from auth_routes import auth_routes
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "MjKH23LMNk")

# Allow specific origins
allowed_origins = ["http://localhost:5173", "https://reziboost.vercel.app"]
CORS(app, origins=allowed_origins, supports_credentials=True)

app.register_blueprint(auth_routes, url_prefix="/reziboost")  # ✅ matches the import

@app.route("/")
def home():
    return "Hello World!"

if __name__ == "__main__":
    app.run(port=int(os.getenv("PORT", 5134)))
