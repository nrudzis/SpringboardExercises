from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import stories

app = Flask(__name__)

app.config['SECRET_KEY'] = "extremelysecret"
debug = DebugToolbarExtension(app)


@app.route('/')
def select_story():
    """Display selection menu of story templates"""
    story_names = stories.stories.keys()
    return render_template('select.html', story_names=story_names)


@app.route('/prompt')
def prompt_page():
    """Prompt for needed words"""
    selected_story_name = request.args['selected_story']
    p, s = stories.stories[selected_story_name]
    return render_template('prompt.html', selected_story_name=selected_story_name, prompts=p)


@app.route('/story/<selected_story_name>', methods=['POST'])
def story_page(selected_story_name):
    """Display generated story"""
    p, s = stories.stories[selected_story_name]
    story = stories.Story(p, s)
    ans = {prompt: request.form[prompt] for prompt in story.prompts}
    your_story = story.generate(ans)
    return render_template('story.html', your_story=your_story)
