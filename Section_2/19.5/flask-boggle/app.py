from flask import Flask, render_template, session, request, jsonify
from boggle import Boggle
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()
scores = {}


@app.route('/')
def render_board_page():
    """Render board page and display form to submit word."""
    session["board"] = boggle_game.make_board()
    board = session["board"]
    return render_template("boggle.html", board=board)


@app.route('/check-word')
def check_word():
    """Return JSON with result of user submitted word."""
    board = session["board"]
    word = request.args.get("word")
    result = boggle_game.check_valid_word(board, word)
    return jsonify({"result": result})


@app.route('/scores', methods=["POST"])
def track_scores():
    """Track scores from all games."""
    new_score = request.json
    scores[len(scores) + 1] = new_score
    return json_scores
