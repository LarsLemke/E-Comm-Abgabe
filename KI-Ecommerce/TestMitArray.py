import numpy as np

from keras.models import Sequential
from keras.layers import Dense

training_inputs = np.array([[0, 0.5, 1, 0, 1, 1],
                            [1, 1, 1, 0, 0, 0],
                            [1, 0, 1, 1, 1, 0],
                            [0, 1, 1, 0, 1, 1]])

training_outputs = np.array([[0, 1, 1, 0]]).T

test_inputs = np.array([[1, 0, 1, 1, 1, 1],
                        [1, 1, 1, 0, 0, 0],
                        [0, 0, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1]])

test_outputs = np.array([[1, 0, 0, 1]]).T

classifier = Sequential()   # Initialisierung des ANN

classifier.add(Dense(units=6, activation='relu', input_dim=6))
classifier.add(Dense(units=3, activation='relu'))
classifier.add(Dense(units=1, activation='sigmoid'))

classifier.compile(optimizer='adam', loss='binary_crossentropy')
classifier.fit(training_inputs, training_outputs, batch_size=1, epochs=3)

predictions = classifier.predict(test_inputs)

print(np.argmax(predictions, axis=1))
