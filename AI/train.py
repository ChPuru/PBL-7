import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load dataset
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_data = datagen.flow_from_directory(
    "dataset", target_size=(128, 128), batch_size=32, subset="training"
)

val_data = datagen.flow_from_directory(
    "dataset", target_size=(128, 128), batch_size=32, subset="validation"
)

# Define Model
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax') # 3 classes: Plastic, Organic, Metal
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(train_data, validation_data=val_data, epochs=10)
model.save("model/waste_classification_model.h5")
