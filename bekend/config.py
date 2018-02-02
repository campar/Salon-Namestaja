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

#ideja za ADMINA, je da se napravi dekorator nad dekoratorom koji ce proveravati da li je TRENUTNI current_user admin




# from flask.ext.uploads import UploadSet, configure_uploads, IMAGES


# photos = UploadSet('photos', IMAGES)

# app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
# configure_uploads(app, photos)


# @app.route('/upload', methods=['GET', 'POST'])
# def uploadd():
#     if 'file' in request.files:
#         filename = photos.save(request.files['file'])
#         return filename
#     return '''
#     <!doctype html>
#     <title>Upload new File</title>
#     <h1>Upload new File</h1>
#     <form action="" method=post enctype=multipart/form-data>
#       <p><input type=file name=file>
#          <input type=submit value=Upload>
#     </form>
#     '''

    