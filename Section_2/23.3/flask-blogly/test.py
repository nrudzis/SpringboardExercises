from unittest import TestCase
from app import app
from models import db, User, Post, Tag, PostTag

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTests(TestCase):
    """Tests views for User."""

    def setUp(self):
        """Add sample user, sample post, sample tag."""
        Post.query.delete()
        User.query.delete()
        Tag.query.delete()
        PostTag.query.delete()

        user = User(first_name="TestFirstName", last_name="TestLastName", image_url="")
        db.session.add(user)
        db.session.commit()
        self.user_id = user.user_id
        
        post = Post(title="TestTitle", content="TestContent", user_id=user.user_id)
        db.session.add(post)
        db.session.commit()
        self.post_id = post.post_id

        tag = Tag(name="TestTag")
        db.session.add(tag)
        db.session.commit()
        self.tag_id = tag.tag_id

        post_tag = PostTag(post_id=post.post_id, tag_id=tag.tag_id)
        db.session.add(post_tag)
        db.session.commit()

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
            self.assertIn('<li>TestTitle</li>', html)

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

    def test_display_post(self):
        with app.test_client() as client:
            res = client.get(f'/posts/{self.post_id}')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>TestTitle</h1>', html)
            self.assertIn('<p>TestContent</p>', html)
            self.assertIn('By TestFirstName TestLastName', html)

    def test_add_new_post(self):
        with app.test_client() as client:
            d = {'post-title': 'NewPostTitle', 'post-content': 'NewPostContent', 'user_id': self.user_id}
            res = client.post(f'/users/{self.user_id}/posts/new', data=d, follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<li>NewPostTitle</li>', html)

    def test_delete_post(self):
        with app.test_client() as client:
            res = client.get(f'/posts/{self.post_id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn('<li>TestTitle</li>', html)

    def test_display_tags(self):
        with app.test_client() as client:
            res = client.get('/tags')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<li>TestTag</li>', html)

    def test_display_tag_info(self):
        with app.test_client() as client:
            res = client.get(f'/tags/{self.tag_id}')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>TestTag</h1>', html)
            self.assertIn('<li>TestTitle</li>', html)

    def test_add_new_tag(self):
        with app.test_client() as client:
            d = {'tag-name': 'NewTestTag'}
            res = client.post('/tags/new', data=d, follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<li>NewTestTag</li>', html)

    def test_delete_tag(self):
        with app.test_client() as client:
            res = client.get(f'/tags/{self.tag_id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertNotIn('<li>TestTag</li>', html)

