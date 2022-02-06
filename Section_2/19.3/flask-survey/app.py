from flask import Flask, render_template
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)

responses = []


@app.route('/')
def start_page():
    """Render start page."""
    survey = surveys.surveys["satisfaction"]
    survey_title = survey.title
    survey_instructions = survey.instructions
    return render_template("home.html", survey_title=survey_title, survey_instructions=survey_instructions)
