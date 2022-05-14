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

@app.route('/users/new', methods=['GET', 'POST'])
def add_new_user():
    """Render page with form to add new user."""
    if request.method == 'POST':
        first_name = request.form["first-name"]
        last_name = request.form["last-name"]
        image_url = request.form["image-url"]
        if image_url != '':
            new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
        else:
            new_user = User(first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        db.session.commit()
        return redirect('/users')
    else:
        return render_template("new-user.html")
