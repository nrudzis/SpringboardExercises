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
        """Display random word.

        >>> test = open("test.txt", "x")
        >>> test = open("test.txt", "w")
        >>> test.write("hello\\nworld\\nI\\nam\\na\\nstring\\nok")
        28
        >>> test = open("test.txt", "r")
        >>> wf = WordFinder("test.txt")
        7 words read
        >>> def different_words():
        ...     first_word = wf.random()
        ...     second_word = wf.random()
        ...     while first_word == second_word:
        ...         second_word = wf.random()
        ...     return first_word != second_word
        ...
        >>> different_words()
        True
        >>> import os
        >>> os.remove("test.txt")
        """

        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    """Find words in a file, and exclude comments and blank lines."""
    def __init__(self, path):
        """Print number of words found."""
        super().__init__(path)

    def parse(self, file):
        """Remove new line character from words, and remove blank lines and words with the hash symbol."""
        words = super().parse(file)
        return [word for word in words if word != "" and "#" not in word]
