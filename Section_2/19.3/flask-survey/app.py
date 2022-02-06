from flask import Flask, render_template
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)

responses = []
satisfaction_survey = surveys.surveys["satisfaction"]
satisfaction_survey_title = satisfaction_survey.title


@app.route('/')
def start_page():
    """Render start page."""
    survey_instructions = satisfaction_survey.instructions
    return render_template("home.html", survey_title=satisfaction_survey_title, survey_instructions=survey_instructions)


@app.route('/questions/<q_number>')
def question_page(q_number):
    """Display survey question."""
    survey_question = satisfaction_survey.questions[int(q_number)]
    question = survey_question.question
    choices = survey_question.choices
    return render_template("questions.html", survey_title=satisfaction_survey_title, q_number=q_number, question=question, choices=choices)
