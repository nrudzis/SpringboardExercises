"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def redirect_to_users():
    """TO BE MODIFIED LATER."""
    return redirect('/users')

@app.route('/users')
def display_users():
    """Render user list page."""
    users = User.query.all()
    return render_template("users.html", users=users)

@app.route('/users/<user_id>')
def display_user_info(user_id):
    """Render user info page."""
    user = User.query.get_or_404(user_id)
    return render_template("user-info.html", user=user)
