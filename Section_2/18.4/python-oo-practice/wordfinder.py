"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    def __init__(self, path):
        file = open(path, "r")
        self.words = self.parse(file)
        print(f"{len(self.words)} words read")
        file.close()

    def parse(self, file):
        return [word.rstrip("\n") for word in file]

    def random(self):
        return random.choice(self.words)
