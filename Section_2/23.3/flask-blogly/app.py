"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

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

@app.route('/users/<user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    """Render page with form to edit existing user."""
    user = User.query.get(user_id)
    if request.method == 'POST':
        user.first_name = request.form["first-name"]
        user.last_name = request.form["last-name"]
        user.image_url = request.form["image-url"]
        db.session.add(user)
        db.session.commit()
        return redirect('/users')
    else:
        return render_template("edit-user.html", user=user)

@app.route('/users/<user_id>/delete')
def delete_user(user_id):
    """Delete user."""
    User.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return redirect('/users')

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

@app.route('/users/<user_id>/posts/new', methods=['GET', 'POST'])
def add_new_post(user_id):
    """Render page with form to add new post."""
    if request.method == 'POST':
        post_title = request.form["post-title"]
        post_content = request.form["post-content"]
        new_post = Post(title=post_title, content=post_content, user_id=user_id)
        db.session.add(new_post)
        db.session.commit()
        return redirect(f'/users/{user_id}')
    else:
        user = User.query.get(user_id)
        return render_template("new-post.html", user=user)

@app.route('/posts/<post_id>')
def display_post(post_id):
    """Render post page."""
    post = Post.query.get_or_404(post_id)
    return render_template("post.html", post=post)

@app.route('/posts/<post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    """Render page with form to edit existing post."""
    post = Post.query.get(post_id)
    if request.method == 'POST':
        post.title = request.form["post-title"]
        post.content = request.form["post-content"]
        db.session.add(post)
        db.session.commit()
        return redirect(f'/posts/{post_id}')
    else:
        return render_template("edit-post.html" , post=post)

@app.route('/posts/<post_id>/delete')
def delete_post(post_id):
    """Delete post."""
    post = Post.query.filter_by(post_id=post_id)
    user_id = post.first().user_id
    post.delete()
    db.session.commit()
    return redirect(f'/users/{user_id}')
