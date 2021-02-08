# QUELLE: https://machinelearningmastery.com/tutorial-first-neural-network-python-keras/
# first neural network with keras make predictions
from numpy import loadtxt
from tensorflow import keras
# load the dataset
dataset = loadtxt('Boegen0_299.csv', delimiter=',')
testset = loadtxt('Boegen300_401.csv', delimiter=',')
Uebergabe = loadtxt('Uebergabe.csv', delimiter=',')
# split into input (X) and output (y) variables
dataset_X = dataset[:, 0:12]
dataset_Y = dataset[:, 12]
testset_X = testset[:, 0:12]
testset_Y = testset[:,12]
Uebergabe_Input = 			Uebergabe[0:12]
Uebergabe_Oberkoerper = 	Uebergabe[12]
Uebergabe_Ruecken = 		Uebergabe[13]
Uebergabe_Beine = 			Uebergabe[14]

# Load the keras model
Oberkoerper = keras.models.load_model("01-19-2021_02-35-30 Oberkoerper.h5")
Ruecken = keras.models.load_model("01-19-2021_02-51-46 Ruecken.h5")
Beine = keras.models.load_model("01-19-2021_03-01-38 Beine.h5")

# make class predictions with the model
#predictions = Oberkoerper.predict(Uebergabe_Input)
print(Uebergabe_Input)
print(dataset_X)
# summarize the first 5 cases
# Kontrolle mit Testdatensatz
#for i in range(100):
#	print('%s => %d (expected %d)' % (testset_X[i].tolist(), predictions[i], testset_Y[i]))
