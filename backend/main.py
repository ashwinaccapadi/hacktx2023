import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from db import setup_db



app = Flask(__name__)
CORS(app)
db = setup_db()
app.config['UPLOAD_FOLDER'] = '.\pifuhd\sample_images'



@app.route('/home')
def home():
    users = db['Users']
    data = users.find({"username" : "AV912"})
    documents = []
    for document in data:
        document.pop('_id', None)
        documents.append(document)
    data.close()
    json_data = json.dumps(documents)
    print(json_data)
    return(json_data)
   

@app.route('/login')
def login():
   return 0

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


if __name__ == '__main__':
   app.run(debug=True)