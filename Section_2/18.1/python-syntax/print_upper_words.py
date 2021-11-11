def print_upper_words(words, must_start_with):
    """
    Accepts a list of words and a set of letters.
    Prints uppercased word on a new line if word begins with a letter in the set.
    """

    for word in words:
        for letter in must_start_with:
            if word[0].lower() == letter:
                print(word.upper())

# this should print "HELLO", "HEY", "YO", and "YES"

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"})
