def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    s_vowels = [c for c in s if c.lower() in 'aeiou']
    letters = list(s)
    for i in range(len(letters)):
        if letters[i].lower() in 'aeiou':
            sub = s_vowels.pop()
            letters[i] = sub
    return ''.join(letters)
