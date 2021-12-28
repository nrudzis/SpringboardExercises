from flask import Flask

app = Flask(__name__)


@app.route('/welcome')
def say_welcome():
    """A route that returns welcome"""
    return "welcome"


@app.route('/welcome/home')
def say_welcome_home():
    """A route that returns welcome home"""
    return "welcome home"


@app.route('/welcome/back')
def say_welcome_back():
    """A route that returns welcome back"""
    return "welcome back"
