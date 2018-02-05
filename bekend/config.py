from bekend import app,CORS
from flask import  jsonify, request
import jwt
from functools import wraps


cors = CORS(app, resources={r"*": {"origins": "*"}})

app.config['CORS_HEADERS'] = 'Content-Type'

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'flaskbaza'

 
#JWT SECRET 
app.config['SECRET_KEY'] = 'tokensifra'


def zatrazi_token(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401
        try:
            jwt.decode(token, app.config['SECRET_KEY'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message' : 'Token expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message' : 'Token invalid!'}), 401
        return f(*args, **kwargs)
    return wrapper
    