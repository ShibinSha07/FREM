from app import create_app, socketio,db

app = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=3001)

with app.app_context():
    db.create_all()
    print("tables created succesfully")