import tensorflow as tf
import numpy as np
import cv2
from flask import Flask, request, jsonify

# **Load Model**
model = tf.keras.models.load_model("model/waste_classification_model.h5")

# **Class Labels**
class_names = ["plastic", "metal", "organic"]

# **Flask API to Handle Requests**
app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify_waste():
    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (150, 150)) / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    waste_type = class_names[np.argmax(prediction)]

    return jsonify({"wasteType": waste_type})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
