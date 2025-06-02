from flask import Blueprint, request, jsonify, make_response
import jwt
import datetime
from flask_cors import CORS
from mysql_connect import get_connection
from db_ops import find_one, insert_one
from dotenv import load_dotenv
import os

load_dotenv()

auth_routes = Blueprint("auth_routes", __name__)
CORS(auth_routes, supports_credentials=True)

SECRET_KEY = os.getenv("SECRET_KEY", "MjKH23LMNk")

def format_date():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def authenticate(f):
    def wrapper(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return make_response("Unauthorized", 401)
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.username = data["username"]
        except jwt.ExpiredSignatureError:
            return make_response(jsonify({"message": "Token expired"}), 403)
        except jwt.InvalidTokenError:
            return make_response(jsonify({"message": "Invalid token"}), 403)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@auth_routes.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = find_one("SELECT * FROM users WHERE username = %s", (username,))
    if user:
        return make_response("User already exists", 400)

    insert_one("INSERT INTO users (username, password, membership) VALUES (%s, %s, %s)", (username, password, "free"))

    token = jwt.encode({"username": username}, SECRET_KEY, algorithm="HS256")
    res = make_response("Signup successful")
    res.set_cookie("token", token, httponly=True, max_age=3600, samesite="None", secure=True)
    return res

@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = find_one("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    if not user:
        return make_response("Invalid credentials", 401)

    token = jwt.encode({"username": username}, SECRET_KEY, algorithm="HS256")
    res = make_response("Login successful")
    res.set_cookie("token", token, httponly=True, max_age=3600, samesite="None", secure=True)
    return res

@auth_routes.route("/logout", methods=["GET"])
def logout():
    res = make_response("Logout successful")
    res.delete_cookie("token")
    return res

@auth_routes.route("/auth", methods=["GET"])
@authenticate
def auth_check():
    user = find_one("SELECT * FROM users WHERE username = %s", (request.username,))
    if user:
        return "Authenticated"
    else:
        return make_response("Unauthorized", 401)

@auth_routes.route("/analytics", methods=["GET"])
@authenticate
def analytics():
    try:
        insert_one(
            "INSERT INTO analytics (username, visit_time) VALUES (%s, %s)",
            (request.username, format_date())
        )
        return jsonify({"message": "Analytics recorded"})
    except Exception as e:
        return make_response(str(e), 500)

@auth_routes.route("/feedback", methods=["POST"])
@authenticate
def feedback():
    data = request.get_json()
    try:
        insert_one(
            "INSERT INTO feedback (username, message) VALUES (%s, %s)",
            (request.username, data.get("message"))
        )
        return "Feedback submitted successfully"
    except Exception as e:
        return make_response("Error submitting feedback", 500)

@auth_routes.route("/test", methods=["GET"])
def test():
    return "Test successful"


@auth_routes.route("/saveData", methods=["POST"])
def save_candidate_profile():
    data = request.get_json()
    
    name = data.get("name")
    college = data.get("college")
    education = data.get("education")
    email = data.get("email")
    experience = data.get("experience")
    gender = data.get("gender")
    location = data.get("location")
    mobile_num = data.get("mobile_num")
    position = data.get("position")

    # Assuming insert_one is your custom DB helper function
    insert_one("""
        INSERT INTO candidate_profile (
            name, college, education, email, experience, gender, location, mobile_num, position
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (name, college, education, email, experience, gender, location, mobile_num, position))

    res = make_response("Candidate profile saved successfully")
    return res

