"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User."""

    __tablename__ = 'user'

    id = db.Column(
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
        default='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
    )
