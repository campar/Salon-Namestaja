from bekend import app,mysql,jsonify,request, make_response
import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from bekend.config import zatrazi_token

@app.route("/korisnici")
def get_svi_korisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute('''SELECT * FROM `korisnik`''')
    return jsonify(data = cursor.fetchall())

@app.route("/korisnici/<int:korisnik_id>", methods=["GET"])
@zatrazi_token
def get_pojedinacni_korisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id))
    return jsonify(data = cursor.fetchone())

@app.route("/korisnici", methods=["POST"])
def kreiraj_korisnika():
    db = mysql.get_db()
    cursor = db.cursor()

    query = ''' INSERT INTO korisnik(ime,prezime,korisnicko_ime,lozinka)
                       VALUES(%s, %s, %s, %s) '''
    lozinka = generate_password_hash(request.json["lozinka"])

    cursor.execute(query, (request.json["ime"], request.json["prezime"], request.json["korisnicko_ime"], lozinka))
    db.commit()

    return jsonify({"status":True}),201


@app.route("/korisnici/<int:korisnik_id>", methods=["PUT"])
def izmeni_korisnika(korisnik_id):
    cursor = mysql.get_db().cursor()
    db = mysql.get_db()
    cursor.execute('''UPDATE korisnik
                      SET    ime=%s
                      WHERE  id=%s''',(request.form["ime"],korisnik_id))
    db.commit()
    return jsonify({"status":True}),200

@app.route("/korisnici/<int:korisnik_id>", methods=["DELETE"])
def obrisi_korisnika(korisnik_id):
    cursor = mysql.get_db().cursor()
    db = mysql.get_db()
    cursor.execute('''DELETE FROM korisnik
                      WHERE id=%s''',(korisnik_id))
    db.commit()
    return jsonify({"status":True}),202

@app.route("/login", methods=['POST'])
def login():
    cursor = mysql.get_db().cursor()
    
    cursor.execute("SELECT * FROM korisnik WHERE korisnicko_ime=%s ", (request.json["korisnicko_ime"]))
    korisnik = cursor.fetchone()

    if korisnik:
        if check_password_hash(korisnik['lozinka'], request.json["lozinka"]): 
            token = jwt.encode({'korisnik' : korisnik, 'exp' : datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])
            return jsonify({'token' : token.decode('UTF-8'), "korisnik":korisnik})
        return jsonify({"success": "lozinka nije tacna"})
    return jsonify({"success": "korisnicko ime ne postoji"})