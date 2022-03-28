from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle
import string


class BoggleViewsTests(TestCase):

    def test_board_page(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            td_bools= [td in html for td in [f'<td>{l}</td>' for l in string.ascii_uppercase]]
            
            # status code is 200
            self.assertEqual(res.status_code, 200)

            # expected html template is rendered
            self.assertIn('<section id="game-area">', html)

            # html includes <td> tag enclosing an uppercase letter
            self.assertIn(True, td_bools)

    def test_session(self):
        with app.test_client() as client:
            res = client.get('/')
            board = session["board"]
            letters = ''.join([''.join(l) for l in board])

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # board contains five rows
            self.assertEqual(len(board), 5)

            # each row contains five elements
            self.assertEqual(len(board[0]), 5)
            self.assertEqual(len(board[1]), 5)
            self.assertEqual(len(board[2]), 5)
            self.assertEqual(len(board[3]), 5)
            self.assertEqual(len(board[4]), 5)

            # all elements are uppercase letters
            self.assertTrue(letters.isalpha() and letters.isupper())

    def test_word_check(self):
        with app.test_client() as client:
            res = client.get('/')
            board = session["board"]
            boggle_game = Boggle()

            first_word = board[4][2] + board[3][2] + board[2][3]
            result = boggle_game.check_valid_word(board, first_word)
            res = client.get(f'/check-word?word={first_word}')

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # json matches result from Boggle using valid game sequence string
            self.assertEqual(res.json["result"], result)

            second_word = 'asdfsa'
            result = boggle_game.check_valid_word(board, second_word)
            res = client.get(f'/check-word?word={second_word}')

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # json matches result from Boggle using random letter string
            self.assertEqual(res.json["result"], result)

            third_word = 'cat'
            result = boggle_game.check_valid_word(board, third_word)
            res = client.get(f'/check-word?word={third_word}')

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # json matches result from Boggle using valid word string
            self.assertEqual(res.json["result"], result)

            fourth_word = '98alkj.,#$'
            result = boggle_game.check_valid_word(board, fourth_word)
            res = client.get(f'/check-word?word={fourth_word}')

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # json matches result from Boggle using random character string
            self.assertEqual(res.json["result"], result)

    def test_score_tracking(self):
        with app.test_client() as client:
            res = client.post('/scores', json={'score': '14'})

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # '1' in json equals first score
            self.assertEqual(res.json['1']['score'], '14')

            res = client.post('/scores', json={'score': '23'})

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # '2' in json equals second score
            self.assertEqual(res.json['2']['score'], '23')

            res = client.post('/scores', json={'score': '0'})

            # status code is 200
            self.assertEqual(res.status_code, 200)

            # '3' in json equals third score
            self.assertEqual(res.json['3']['score'], '0')
