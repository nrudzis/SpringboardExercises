from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length

class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=1, max=20, message='Must be between %(min)d and %(max)d characters.')])
    password = PasswordField('Password', validators=[InputRequired()])
    email = StringField('Email', validators=[InputRequired(), Email(message='Must be a valid email.'), Length(max=50, message='Must not be greater than %(max)d characters.')])
    first_name = StringField('First Name', validators=[InputRequired(), Length(min=1, max=30, message='Must be between %(min)d and %(max)d characters.')])
    last_name = StringField('Last Name', validators=[InputRequired(), Length(min=1, max=30, message='Must be between %(min)d and %(max)d characters.')])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
