"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User model."""

    __tablename__ = 'users'

    user_id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    first_name = db.Column(
        db.String(20),
        nullable=False
    )

    last_name = db.Column(
        db.String(20),
        nullable=False
    )

    image_url = db.Column(
        db.String(100),
        nullable=False,
        default='/static/user-solid.svg'
    )

    posts = db.relationship('Post', backref='user', cascade='all, delete, delete-orphan', passive_deletes=True)

class Post(db.Model):
    """Post model."""

    __tablename__ = 'posts'

    post_id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    title = db.Column(
        db.String(50),
        nullable=False
    )

    content = db.Column(
        db.String(500),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.now
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.user_id', ondelete='CASCADE'),
        nullable=False
    )

    tags = db.relationship('Tag', secondary='posts_tags', backref='posts')

    post_tags = db.relationship('PostTag', backref='post', cascade='all, delete, delete-orphan', passive_deletes=True)

class Tag(db.Model):
    """Tag model."""

    __tablename__ = 'tags'

    tag_id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    name = db.Column(
        db.String(20),
        nullable=False
    )

    tag_posts = db.relationship('PostTag', backref='tag', cascade='all, delete, delete-orphan', passive_deletes=True)

class PostTag(db.Model):
    """PostTag model."""

    __tablename__ = 'posts_tags'

    post_id = db.Column(
        db.Integer,
        db.ForeignKey('posts.post_id', ondelete='CASCADE'),
        primary_key=True
    )

    tag_id = db.Column(
        db.Integer,
        db.ForeignKey('tags.tag_id', ondelete='CASCADE'),
        primary_key=True
    )
