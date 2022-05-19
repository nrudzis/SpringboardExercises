from flask_wtf import FlaskForm
from wtforms import StringField, FloatField

class NewPetForm(FlaskForm):
    name = StringField('Pet Name')
    species = StringField('Species')
    photo_url = StringField('Photo URL')
    age = FloatField('Age')
    notes = StringField('Notes')
