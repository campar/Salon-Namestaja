from bekend import app, cross_origin, mysql,jsonify,request
from flask.ext.uploads import UploadSet, IMAGES, configure_uploads

from bekend.config import zatrazi_token

@cross_origin(origin='*',headers=['Content-Type','Authorization'])
@app.route("/proizvodi", methods=["GET"])

def get_proizvodi():
    cursor = mysql.get_db().cursor()
    cursor.execute('''SELECT * FROM proizvod
                      -- INNER JOIN komentar 
                      --     ON vest.komentar_id = komentar.id
                      INNER JOIN kategorija
                          ON proizvod.kategorija_id = kategorija.id''')
    
    return jsonify(data = cursor.fetchall())


app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)


@app.route("/proizvodi", methods=["POST"])
@zatrazi_token
def kreiraj_proizvod():
    db = mysql.get_db()
    cursor = db.cursor()

    filename = photos.save(request.files['file']) 

    query = ''' INSERT INTO proizvod(cena,naziv,opis,slika,kolicina,kategorija_id)
                       VALUES(TRUNCATE(%s, 2), %s, %s, %s, %s, %s) '''
    cursor.execute(query, (request.form["cena"], request.form["naziv"], 
                          request.form["opis"], filename, 
                          request.form["kolicina"], request.form["kategorija_id"]))
    db.commit() 
    return jsonify({"status":True}),201

@app.route("/proizvodi/<int:proizvod_id>", methods=["GET"])
def get_pojedinacan_proizvod(proizvod_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (proizvod_id))
    return jsonify(data = cursor.fetchone())


@app.route("/proizvodi/<int:proizvod_id>", methods=["DELETE"])
@zatrazi_token
def obrisi_proizvod(proizvod_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("DELETE FROM proizvod WHERE id=%s", (proizvod_id))
    return jsonify({"status":True}),204

# @app.route('/proizvodi/<int:proizvod_id>', methods=['PUT'])
# def upload():
#     cursor = mysql.get_db().cursor()
#     db = mysql.get_db()
#     file = request.files['file']
#     filename = photos.save(file)


#     cursor.execute('''UPDATE proizvod
#                       SET    slika=%s
#                       WHERE  id=%s''',(filename ,1))
#     db.commit()
#     return filename
#     return '''
#     <!doctype html>
#     <title>Upload new File</title>
#     <h1>Upload new File</h1>
#     <form action="1" method=post enctype=multipart/form-data>
#       <p><input type=file name=file>
#          <input type=submit value=Upload>
#     </form>