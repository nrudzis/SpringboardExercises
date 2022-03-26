from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class BoggleViewsTests(TestCase):

    def test_board_page(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<section id="game-area">', html)

    def test_word_check(self):
        with app.test_client() as client:
            boggle_game = Boggle()
            res = client.get('/')
            board = session["board"]

            first_word = board[0][1] + board[0][2] + board[0][3]
            import pdb
            pdb.set_trace()

            result = boggle_game.check_valid_word(board, first_word)
            res = client.get(f'/check-word?={first_word}')
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json["result"], result)

            second_word = board[4][2] + board[3][3]
            result = boggle_game.check_valid_word(board, second_word)
            res = client.get(f'/check-word?={second_word}')
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json["result"], result)

            third_word = board[4][0] + board[3][0] + board[2][1]
            result = boggle_game.check_valid_word(board, third_word)
            res = client.get(f'/check-word?={third_word}')
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json["result"], result)

    def test_score_tracking(self):
        with app.test_client() as client:
            res = client.post('/scores', json={'score': '14'})

            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['1']['score'], '14')

            res = client.post('/scores', json={'score': '23'})

            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['2']['score'], '23')

            res = client.post('/scores', json={'score': '0'})

            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['3']['score'], '0')
