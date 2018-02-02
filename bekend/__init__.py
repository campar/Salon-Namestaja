from flask import Flask, jsonify, request, make_response
import pymysql
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_url_path='')


mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)
mysql.init_app(app)

import bekend.config

import bekend.routes

# if __name__ == "__main__":
#     app.run(debug=True)