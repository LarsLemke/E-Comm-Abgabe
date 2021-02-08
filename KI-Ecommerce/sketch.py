import pandas as pd                         # Zum oeffnen von csv Dateien
import time
from keras.models import Sequential
from keras.layers import Dense

# Trainings- und Testdaten einfuegen
# Hier sollten die trainingsdaten reingeladen werden
# Die Parameter sollten dann als CSV gespeichert werden

training_input =
training_output =
test_input =
test_output =

# Normalisierung
# Hier sollen die Input werde normalisiert werden
# Die einzelnen Neuronen sollten Werte zwischen 0 und 1 bekommen


# Model
# Hier wird das neuronale Netz erstellt und Initialisiert
# Dieser Skriptteil sollte spaeter ausgelagert werden

classifier = Sequential()   # Initialisierung des ANN

classifier.add(Dense(units = 16, activation = 'relu', input_dim = 24))
classifier.add(Dense(units = 8, activation = 'relu'))
classifier.add(Dense(units = 6, activation = 'relu'))
classifier.add(Dense(units = 3, activation = 'sigmoid'))            # 3 Klassifizierungsmerkmale --> Oberkörper, Rücken und Beine

# Training
# Hier soll das erstellte Netz trainiert und gespeichert werden
# Dieser Teil sollte spaeter ausgelagert werden

classifier.compile(optimizer = 'rmsprop', loss = 'binary_crossentropy')
classifier.fit(training_input, training_output, batch_Size = 1, epochs = 10)

t = time.localtime()
timestamp = time.strftime('%b-%d-%Y_%H%M', t)
classifier.save_weights('model_' + timestamp + '.h5')

# Predicition
# Hier soll das erstellte neuronale Netz vorhersagen treffen
# Die Ergebnisse sollten dann auch noch geplottet werden