from flask import Flask, render_template, request, redirect, url_for
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
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
    if int(q_number) != len(responses):
        return redirect(url_for('question_page', q_number=str(len(responses))))
    else:
        survey_question = satisfaction_survey.questions[int(q_number)]
        question = survey_question.question
        choices = survey_question.choices
        return render_template("questions.html", survey_title=satisfaction_survey_title, q_number=q_number, question=question, choices=choices)


@app.route('/answer', methods=["POST"])
def handle_answers():
    """Append answers to responses list and redirect to the next question."""
    answer = request.form["answer"]
    responses.append(answer)
    q_number = request.form["q_number"]
    next_q_number = str(int(q_number) + 1)
    return redirect(url_for('question_page', q_number=next_q_number) if int(next_q_number) < len(satisfaction_survey.questions) else '/thank-you')


@app.route('/thank-you')
def say_thanks():
    """Render thank you page."""
    return render_template("thanks.html", survey_title=satisfaction_survey_title)
