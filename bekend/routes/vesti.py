from bekend import app, cross_origin, mysql

@cross_origin(origin='*',headers=['Content-Type','Authorization'])
@app.route("/vest", methods=["GET"])
def get_vest():
    cursor = mysql.get_db().cursor()
    cursor.execute('''SELECT * FROM vest
                      -- INNER JOIN komentar 
                      --     ON vest.komentar_id = komentar.id
                      INNER JOIN kategorija
                          ON vest.kategorija_id = kategorija.id''')
    return jsonify(data = cursor.fetchall())

@app.route("/vest", methods=["POST"])
def kreiraj_vest():
    db = mysql.get_db()
    cursor = db.cursor()

    query = ''' INSERT INTO vest(naslov,sadrzaj,putanja_slike,kategorija_id)
                       VALUES(%s, %s, %s, %s) '''
    cursor.execute(query, (request.form["naslov"], request.form["sadrzaj"], request.form["putanja_slike"], request.form["kategorija"]))
    db.commit()

    return jsonify({"status":"done"}),201

@app.route("/vest/<int:vest_id>", methods=["GET"])
def get_pojedinacna_vest(vest_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM vest WHERE id=%s", (vest_id))
    return jsonify(data = cursor.fetchall())
