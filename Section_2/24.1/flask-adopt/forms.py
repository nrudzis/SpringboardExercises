from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, AnyOf

class NewPetForm(FlaskForm):
    name = StringField('Pet Name', validators=[InputRequired()])
    species = StringField('Species', validators=[AnyOf(('cat', 'dog', 'porcupine'), message='Must be "cat", "dog", or "porcupine"')])
    photo_url = StringField('Photo URL', validators=[Optional(), URL(message='Must be a valid URL')])
    age = FloatField('Age', validators=[Optional(), NumberRange(min=0, max=30, message='Must be between 0 and 30')])
    notes = StringField('Notes')

class EditPetForm(FlaskForm):
    photo_url = StringField('Photo URL', validators=[Optional(), URL(message='Must be a valid URL')])
    notes = TextAreaField('Notes')
    available = BooleanField('Pet Available?')
