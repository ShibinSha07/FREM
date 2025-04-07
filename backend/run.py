from app import create_app, socketio,db

app = create_app()

# with app.app_context():
#     # db.drop_all()
#     db.create_all()
#     print("tables created succesfully")

if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=3001, allow_unsafe_werkzeug=True)