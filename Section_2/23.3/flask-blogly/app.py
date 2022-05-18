"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

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
        tag_ids = request.form.getlist("tag-ids")
        new_post = Post(title=post_title, content=post_content, user_id=user_id)
        db.session.add(new_post)
        if tag_ids:
            db.session.flush()
            for tag_id in tag_ids:
                post_tag = PostTag(post_id=new_post.post_id, tag_id=tag_id)
                db.session.add(post_tag)
        db.session.commit()
        return redirect(f'/users/{user_id}')
    else:
        user = User.query.get(user_id)
        tags = Tag.query.all()
        return render_template("new-post.html", user=user, tags=tags)

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
        tag_ids = request.form.getlist("tag-ids")
        PostTag.query.filter_by(post_id=post_id).delete()
        if tag_ids:
            for tag_id in tag_ids:
                post_tag = PostTag(post_id=post_id, tag_id=tag_id)
                db.session.add(post_tag)
        db.session.add(post)
        db.session.commit()
        return redirect(f'/posts/{post_id}')
    else:
        tags = Tag.query.all()
        print(post.tags)
        return render_template("edit-post.html" , post=post, tags=tags)

@app.route('/posts/<post_id>/delete')
def delete_post(post_id):
    """Delete post."""
    post = Post.query.filter_by(post_id=post_id)
    user_id = post.first().user_id
    post.delete()
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route('/tags')
def display_tags():
    """Render tag list page."""
    tags = Tag.query.all()
    return render_template("tags.html", tags=tags)

@app.route('/tags/<tag_id>')
def display_tag_info(tag_id):
    """Render tag info page."""
    tag = Tag.query.get_or_404(tag_id)
    return render_template("tag-info.html", tag=tag)

@app.route('/tags/new', methods=['GET', 'POST'])
def add_new_tag():
    """Render page with form to add new tag."""
    if request.method == 'POST':
        tag_name = request.form["tag-name"]
        new_tag = Tag(name=tag_name)
        db.session.add(new_tag)
        db.session.commit()
        return redirect('/tags')
    else:
        return render_template("new-tag.html")

@app.route('/tags/<tag_id>/edit', methods=['GET', 'POST'])
def edit_tag(tag_id):
    """Render page with form to edit existing tag."""
    tag = Tag.query.get(tag_id)
    if request.method == 'POST':
        tag.name = request.form["tag-name"]
        db.session.add(tag)
        db.session.commit()
        return redirect('/tags')
    else:
        return render_template("edit-tag.html", tag=tag)
