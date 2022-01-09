from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import stories

app = Flask(__name__)

app.config['SECRET_KEY'] = "extremelysecret"
debug = DebugToolbarExtension(app)


@app.route('/')
def select_story():
    options = stories.stories.keys()
    return render_template("select.html", stories=options)


@app.route('/prompt')
def prompt_page():
    selected_story = request.args["selected_story"]
    p, s = stories.stories[selected_story]
    return render_template("prompt.html", selected_story=selected_story, prompts=p)


@app.route('/story')
def story_page():
    p, s = stories.stories[request.args.get("selected_story")]
    story = stories.Story(p, s)
    ans = {prompt: request.args[prompt] for prompt in story.prompts}
    your_story = story.generate(ans)
    return render_template("story.html", your_story=your_story)
