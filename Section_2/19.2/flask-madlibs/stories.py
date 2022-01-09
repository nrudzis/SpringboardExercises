"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


stories = {
    "story1": [["place", "noun", "verb", "adjective", "plural_noun"], """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}."""],
    "story2": [["adverb", "noun", "adjective"], """It is a truth {adverb} acknowledged, that a single {noun} in possession of a {adjective} fortune, must be in want of a wife"""],
    "story3": [["noun", "plural_noun", "adjective", "adverb"], """The story so far: In the beginning the {noun} was created. This has made a lot of {plural_noun} very {adjective} and been {adverb} regarded as a bad move."""]
}
