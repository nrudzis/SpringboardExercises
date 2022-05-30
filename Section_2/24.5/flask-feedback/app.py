"""Feedback application."""

from flask import Flask, request, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from forms import RegisterForm, LoginForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def redirect_to_register():
    """Redirect to register."""
    return redirect('/register')


@app.route('/users/<username>')
def user_info(username):
    """Render user info page."""
    if "username" not in session:
        flash('You need to log in to do that!')
        return redirect('/login')
    user = User.query.get_or_404(username)
    return render_template('user-info.html', user=user)


@app.route('/register', methods=['GET', 'POST'])
def register_new_user():
    """
    Render registration form page.
    Redirect to user infor page on form submit.
    """
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)
        db.session.add(new_user)
        db.session.commit()
        session['username'] = new_user.username
        return redirect(f'/users/{new_user.username}')
    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def authenticate_user():
    """
    Render login form page.
    Authenticate user on form submit and redirect to user info page.
    """
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            flash(f'Welcome back {user.first_name}!')
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Username or password is invalid.']
    return render_template('login.html', form=form)


@app.route('/logout', methods=['POST'])
def logout_user():
    """Log out user."""
    session.pop('username')
    flash('Bye!')
    return redirect('/')
