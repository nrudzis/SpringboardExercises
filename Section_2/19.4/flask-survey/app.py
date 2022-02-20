from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

satisfaction_survey = surveys.surveys["satisfaction"]
satisfaction_survey_title = satisfaction_survey.title


@app.route('/')
def start_page():
    """Render start page."""
    survey_instructions = satisfaction_survey.instructions
    return render_template("home.html", survey_title=satisfaction_survey_title, survey_instructions=survey_instructions)


@app.route('/session', methods=["POST"])
def set_up_session():
    """Create list within session to hold survey answers."""
    session["responses"] = []
    responses_length = len(session["responses"])
    return redirect(url_for('question_page', q_number=str(responses_length)))


@app.route('/questions/<int:q_number>')
def question_page(q_number):
    """Display survey question."""
    responses_length = len(session["responses"])
    if q_number != responses_length:
        flash("ERROR: Access denied. Please submit response to current question.")
        return redirect(url_for('question_page', q_number=str(responses_length)))
    else:
        survey_question = satisfaction_survey.questions[q_number]
        question = survey_question.question
        choices = survey_question.choices
        return render_template("questions.html", survey_title=satisfaction_survey_title, q_number=str(responses_length), question=question, choices=choices)


@app.route('/answer', methods=["POST"])
def handle_answers():
    """Append answers to responses list and redirect to the next question."""
    answer = request.form["answer"]
    responses = session["responses"]
    responses.append(answer)
    session["responses"] = responses
    responses_length = len(session["responses"])
    return redirect(url_for('question_page', q_number=str(responses_length)) if responses_length < len(satisfaction_survey.questions) else '/thank-you')


@app.route('/thank-you')
def say_thanks():
    """Render thank you page."""
    return render_template("thanks.html", survey_title=satisfaction_survey_title)
