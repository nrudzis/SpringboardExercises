from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTests(TestCase):
    """Tests views for User."""

    def setUp(self):
        """Add sample user."""
        User.query.delete()
        user = User(first_name="TestFirstName", last_name="TestLastName", image_url="")
        db.session.add(user)
        db.session.commit()
        self.user_id = user.user_id

    def tearDown(self):
        """Roll back any current transactions."""
        db.session.rollback()

    def test_display_users(self):
        with app.test_client() as client:
            res = client.get('/users')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<li>TestFirstName TestLastName</li>', html)

    def test_display_user_info(self):
        with app.test_client() as client:
            res = client.get(f'/users/{self.user_id}')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>TestFirstName TestLastName</h1>', html)

    def test_add_new_user(self):
        with app.test_client() as client:
            d = {'first-name': 'NewFirstName', 'last-name': 'NewLastName', 'image-url': ''}
            res = client.post('/users/new', data=d, follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<li>NewFirstName NewLastName</li>', html)

    def test_delete_user(self):
        with app.test_client() as client:
            res = client.get(f'/users/{self.user_id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn('<li>TestFirstName TestLastName</li>', html)
