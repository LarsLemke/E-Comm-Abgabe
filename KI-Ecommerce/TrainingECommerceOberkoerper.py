
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout
from datetime import datetime
# load the dataset
dataset = loadtxt('Boegen0_299.csv', delimiter=',')
testset = loadtxt('Boegen300_401.csv', delimiter=',')
# split into input (X) and output (y) variables
dataset_X = dataset[:, 0:12]
dataset_Y = dataset[:, 12]
testset_X = testset[:, 0:12]
testset_Y = testset[:,12]
# define the keras model
model = Sequential()
model.add(Dense(16, input_dim=12, activation='relu'))
model.add(Dense(12, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(8, activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(1, activation='sigmoid'))
# compile the keras model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
# fit the keras model on the dataset
model.fit(dataset_X, dataset_Y, epochs=250, batch_size=20, verbose=1, shuffle = True)
now = datetime.now()
dateobject = now.strftime("%m-%d-%Y_%H-%M-%S")
KlassenName = 'Oberkoerper'
ModelName = dateobject + " " + KlassenName
model.save(ModelName + ".h5")
model.save_weights(ModelName + "_weights.h5")
# make class predictions with the model
predictions = model.predict_classes(testset_X)		# Der Befehl predict_classes() ist veraltet und wird ab dem 01.01.2021 abgeschaltet
# summarize the first 5 cases
# Kontrolle mit Testdatensatz
for i in range(100):
	print('%s => %d (expected %d)' % (testset_X[i].tolist(), predictions[i], testset_Y[i]))
