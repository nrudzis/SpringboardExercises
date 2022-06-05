"""Feedback application."""

from flask import Flask, request, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm

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
    if 'username' not in session:
        flash('You need to log in to do that!')
        return redirect('/login')
    loggedin_user = User.query.get_or_404(username)
    return render_template('user-info.html', user=loggedin_user)


@app.route('/register', methods=['GET', 'POST'])
def register_new_user():
    """
    Render registration form page.
    Redirect to user info page on form submit.
    """
    form = RegisterForm()
    loggedin_user = User.query.get_or_404(session['username']) if 'username' in session else None
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
    return render_template('register.html', form=form, user=loggedin_user)


@app.route('/login', methods=['GET', 'POST'])
def authenticate_user():
    """
    Render login form page.
    Authenticate user on form submit and redirect to user info page.
    """
    loggedin_user = User.query.get_or_404(session['username']) if 'username' in session else None
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
    return render_template('login.html', form=form, user=loggedin_user)


@app.route('/logout', methods=['POST'])
def logout_user():
    """Log out user."""
    session.pop('username')
    flash('Bye!')
    return redirect('/')


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    """Delete user and redirect to root."""
    if 'username' not in session:
        flash('You need to log in to do that!')
        return redirect('/login')
    current_username = session['username']
    if username == current_username:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
        flash('Account successfully deleted!')
        return redirect('/')
    flash('Action not permitted!')
    return redirect(f'/users/{current_username}')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """
    Render feedback form page.
    Add feedback and redirect to user info page on form submit.
    """
    if 'username' not in session:
        flash('You need to log in to do that!')
        return redirect('/login')
    current_username = session['username']
    if username == current_username:
        loggedin_user = User.query.get_or_404(current_username)
        form = FeedbackForm()
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            new_feedback = Feedback(title=title, content=content, username=username)
            db.session.add(new_feedback)
            db.session.commit()
            return redirect(f'/users/{username}')
        return render_template('add-feedback.html', user=loggedin_user, form=form)
    flash('Action not permitted!')
    return redirect(f'/users/{current_username}')


@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def edit_feedback(feedback_id):
    """
    Render edit feedback form page.
    Update feedback and redirect to user info page on form submit.
    """
    if 'username' not in session:
        flash('You need to log in to do that!')
        return redirect('/login')
    feedback = Feedback.query.get_or_404(feedback_id)
    current_username = session['username']
    if feedback.username == current_username:
        loggedin_user = User.query.get_or_404(current_username)
        form = FeedbackForm(obj = feedback)
        if form.validate_on_submit():
            feedback.title = form.title.data
            feedback.content = form.content.data
            db.session.commit()
            return redirect(f'/users/{feedback.username}')
        return render_template('edit-feedback.html', user=loggedin_user, form=form)
    flash('Action not permitted!')
    return redirect(f'/users/{current_username}')


@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    """Delete feedback and redirect to user info page."""
    if 'username' not in session:
        flash('You need to log in to do that!')
        return redirect('/login')
    feedback = Feedback.query.get_or_404(feedback_id)
    current_username = session['username']
    if feedback.username == current_username:
        db.session.delete(feedback)
        db.session.commit()
        flash('Feedback deleted!')
        return redirect(f'/users/{current_username}')
    flash('Action not permitted!')
    return redirect(f'/users/{current_username}')
