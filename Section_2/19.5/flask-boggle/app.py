from flask import Flask, render_template
from boggle import Boggle
from flask_debugtoolbar import DebugToolbarExtensions

app = Flask(__name___)

app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route('/')
def boggle_board_page():
    """Render game board."""
    session["board"] = boggle_game.make_board()
    board = session["board"]
    return render_template("boggle.html", board=board)
