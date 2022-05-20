"""Models for Cupcakes."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake model."""

    __tablename__ = 'cupcakes'

    cupcake_id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )
    flavor = db.Column(
        db.Text,
        nullable=False
    )
    size = db.Column(
        db.Text,
        nullable=False
    )
    rating = db.Column(
        db.Float,
        nullable=False
    )
    image = db.Column(
        db.Text,
        default='https://tinyurl.com/demo-cupcake',
        nullable=False
    )

    def serialize(self):
        return {
            'cupcake_id': self.cupcake_id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }
