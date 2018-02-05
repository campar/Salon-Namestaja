from bekend import app, cross_origin, mysql,jsonify,request

@app.route("/kategorije", methods=["GET"])
def get_kategorije():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kategorija")
    
    return jsonify(data = cursor.fetchall())
    
@app.route("/kategorije/<int:kategorija_id>/proizvodi", methods=["GET"])
def get_proizvodii(kategorija_id):
    cursor = mysql.get_db().cursor()
    cursor.execute('''SELECT * FROM kategorija
                      INNER JOIN proizvod
                          ON proizvod.kategorija_id = kategorija.id
                          WHERE kategorija_id = %s''', (kategorija_id))
    
    return jsonify(data = cursor.fetchall())
    
@app.route("/kategorije", methods=["POST"])
def kreiraj_kategoriju():
    db = mysql.get_db()
    cursor = db.cursor()

    query = ''' INSERT INTO kategorija(naziv,opis,slika)
                       VALUES(%s, %s, %s) '''
    cursor.execute(query, (request.form["naziv"], request.form["opis"], 
                          request.form["slika"]))
    db.commit()
    return jsonify({"status":True}),201