from json import dumps
from model.users import db, User, app, users_schema, user_schema, token_schema
from flask_marshmallow import Marshmallow
from flask import Flask, request, jsonify, make_response, session
from datetime import datetime
from functools import wraps
from flask_httpauth import HTTPTokenAuth
import hashlib, jwt

ma = Marshmallow(app)
auth = HTTPTokenAuth(scheme='Bearer')

app.config['JSON_SORT_KEYS'] = False

@app.route('/login', methods=['POST'])
def login():
  usuario = request.json['usuario']
  senha = request.json['senha']
  senha_encriptada = hashlib.md5(senha.encode()).hexdigest()

  user = User.query.filter_by(email=usuario,senha=senha_encriptada).first()
  if user is not None:
    result = token_schema.dump(user)
    return make_response(jsonify(result), 200)
  
  return jsonify({'message': "Nenhum usuário localizado com esse email e/ou senha"})

@app.route('/users/<int:id>', methods=['GET'])
@auth.login_required
def get_users_id(id):
  user = User.query.filter_by(id=id).first()
  result = user_schema.dump(user)
  response = make_response(jsonify(result), 200)
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

@app.route('/users', methods=['GET'])
@auth.login_required
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    response = make_response(jsonify(result), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/users/<int:id>', methods=['PUT'])
@auth.login_required
def user_edit(id):
  user = User.query.filter_by(id=id).first()
  if user is None:
    response = make_response(jsonify({'message': "Nenhum usuário localizado com esse id"}), 404)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

  
  try:
    senha_encriptada = hashlib.md5(str(request.json['senha']).encode()).hexdigest()
    encoded_jwt = jwt.encode({'nome': request.json['nome'], 'email': request.json['email']}, senha_encriptada, algorithm='HS256')
    data_nascimento = request.json['data_nascimento'].split('-')    
    nova_data_nascimento = datetime(int(data_nascimento[0]), int(data_nascimento[1]), int(data_nascimento[2]), 0, 0, 0)

    user.nome = request.json['nome']
    user.email = request.json['email']
    user.senha = senha_encriptada
    user.data_nascimento = nova_data_nascimento
    user.token = encoded_jwt
    
    db.session.add(user)
    db.session.commit()
    result = token_schema.dump(user)
    response = make_response(jsonify(result), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  except KeyError as e:
    return make_response(jsonify({'message': f"Forneça o campo: {e}"}), 404)


@app.route('/users', methods=['POST'])
@auth.login_required
def user_create():
  email = request.json['email']
  user = User.query.filter_by(email=email).first()
  if user is not None:
    response = make_response(jsonify({'message': "Já existe um usuário com este e-mail"}), 404)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response 
  
  try:
    senha_encriptada = hashlib.md5(str(request.json['senha']).encode()).hexdigest()
    encoded_jwt = jwt.encode({'nome': request.json['nome'], 'email': request.json['email']}, senha_encriptada, algorithm='HS256')
    data_nascimento = request.json['data_nascimento'].split('-')    
    nova_data_nascimento = datetime(int(data_nascimento[0]), int(data_nascimento[1]), int(data_nascimento[2]), 0, 0, 0)

    newUser = User(nome=request.json['nome'], email=request.json['email'], data_nascimento=nova_data_nascimento, senha=senha_encriptada, token=encoded_jwt)
    
    db.session.add(newUser)
    db.session.commit()
    result = token_schema.dump(newUser)
    response = make_response(jsonify(result), 200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  except KeyError as e:
    response = make_response(jsonify({'message': f"Forneça o campo: {e}"}), 404)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  
@app.route('/users/<int:id>', methods=['DELETE'])
@auth.login_required
def delete_user(id):
  user = User.query.filter_by(id=id).first()
  db.session.delete(user)
  db.session.commit()
  response = make_response(jsonify({"status": f"Id: {id} deletado com successo"}), 200)
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

@auth.verify_token
def verify_token(token):
  user = User.query.filter_by(token=token).first()
  if user is not None:
     return user
  return False
    
app.run(debug=True)