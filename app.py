"""Flask app for Cupcakes"""
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import Cupcake, db, connect_db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)


with app.app_context():
    db.create_all()

@app.route("/")
def home():
    """Homepage"""

    return render_template("home.html")    


@app.route("/api/cupcakes")
def cupcake_list():
    """List of cupcakes"""
    cupcakes = [cupcake.to_dict() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route("/api/cupcakes/<int:cupcake_id>")
def cupcake_info(cupcake_id):
    """Single cupcake data"""    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.to_dict())
