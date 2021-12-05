"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """Find words in a file."""
    def __init__(self, path):
        """Print number of words found."""
        file = open(path, "r")
        self.words = self.parse(file)
        print(f"{len(self.words)} words read")
        file.close()

    def parse(self, file):
        """Remove new line character from words."""
        return [word.rstrip("\n") for word in file]

    def random(self):
        """Display random word."""
        return random.choice(self.words)
