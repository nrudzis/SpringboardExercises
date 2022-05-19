"""Models for Pet Adoption Agency."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    """Pet model."""

    __tablename__ = 'pets'

    pet_id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )
    name = db.Column(
        db.String(30),
        nullable=False
    )
    species = db.Column(
        db.String(30),
        nullable=False,
    )
    photo_url = db.Column(
        db.String(200)
    )
    age = db.Column(
        db.Integer
    )
    notes = db.Column(
        db.String(500),
    )
    available = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )
