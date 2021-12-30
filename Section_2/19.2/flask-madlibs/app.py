from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import stories

app = Flask(__name__)

app.config['SECRET_KEY'] = "extremelysecret"
debug = DebugToolbarExtension(app)


@app.route('/')
def prompt_page():
    prompts = stories.story.prompts
    return render_template("prompt.html", prompts=prompts)


@app.route('/story')
def story_page():
    ans = {prompt: request.args[prompt] for prompt in stories.story.prompts}
    your_story = stories.story.generate(ans)
    return render_template("story.html", your_story=your_story)
