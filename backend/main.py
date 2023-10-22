import json
from flask import Flask, jsonify, request, redirect, session
from flask_cors import CORS
from db import setup_db



app = Flask(__name__)
CORS(app) 

db = setup_db()
users = db['Users']
models = db['Models']
app.config['UPLOAD_FOLDER'] = '.\pifuhd\sample_images'


@app.route('/home')
def home():
    data = users.find({"username" : "AV912"})
    documents = []
    for document in data:
        document.pop('_id', None)
        documents.append(document)
    data.close()
    json_data = json.dumps(documents)
    print(json_data)
    return(json_data)
   



# @app.route('/upload', methods=['POST'])
# def upload_file():
#     # Check if a file is part of the POST request
#     if 'file' not in request.files:
#         return jsonify({"message": "No file part"}), 400
#     uploaded_file = request.files['file']

#     # If the user does not select a file, the browser submits an empty file
#     if uploaded_file.filename == '':
#         return jsonify({"message": "No file selected"}), 400
    
#     metadata = request.form.get('metadata')
#     if not metadata:
#         return jsonify({"message": "No metadata provided"}), 400
    
#     # You can parse the metadata to a dictionary to use it further
#     # metadata_dict = json.loads(metadata)

#     # Save the uploaded file
#     filename = files.save(uploaded_file)

#     # In this example, I'm just returning the filename and metadata.
#     # In a real scenario, you may want to store this information in your database.
#     return jsonify({"filename": filename, "metadata": metadata})


@app.route('/signup', methods=['POST'])
def register():
    register_data = request.get_json()
    username = register_data['username']
    password = register_data['password']
    #password = argon2.hash(password)
    first_name = register_data['first_name']
    last_name = register_data['last_name']

    user = {
        'username': username,
        'password': password,
        'first_name': first_name,
        'last_name': last_name
    }
    data = users.find({'username': username})
    documents = []
    for document in data:
        document.pop('_id', None)
        documents.append(document)
    data.close()
    json_data = json.dumps(documents)
    if len(documents) > 0:
        return "Registration Failed"
    users.insert_one(user)
    return "Registration Successful"
    


#login page that will redirect to user's home page if login is successful
@app.route('/', methods=['POST'])
def login():
    login_data = request.get_json()
    username = login_data['username']
    password = login_data['password']
    password = argon2.hash(password)
    user = users.find_one({'username': username, 'password': password})
    if user:
        session['username'] = username
        return redirect('/home')
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
"""@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Replace with your React app's origin
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response"""


if __name__ == '__main__':
   app.run(debug=True)