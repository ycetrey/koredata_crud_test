import jwt, dotenv
from flask_cors import CORS
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///exemplo.db'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    senha = db.Column(db.String(36), nullable=False)
    token = db.Column(db.String(600), nullable=False)

with app.app_context():
    db.drop_all()
    db.create_all()    

    encoded_jwt = jwt.encode({'nome': 'admin', 'email': 'admin@koredata.com.br'}, '6b2a66ae6e7127e0a477dd1cb87f6f9b', algorithm='HS256')
    user = User(nome='Admin', email='admin@koredata.com.br', data_nascimento=datetime(1982, 3, 26, 0, 0, 0), senha='6b2a66ae6e7127e0a477dd1cb87f6f9b', token=encoded_jwt)

    db.session.add(user)
    db.session.commit()

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "nome", "email", "data_nascimento")

class TokenSchema(ma.Schema):
    class Meta:
        fields = ("id", "nome", "email", "data_nascimento", "token")

user_schema = UserSchema()
token_schema = TokenSchema()
users_schema = UserSchema(many=True)