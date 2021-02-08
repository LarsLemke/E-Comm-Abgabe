
from numpy import loadtxt
from tensorflow import keras

# load the dataset
Uebergabe = loadtxt('Uebergabe.csv', delimiter=',')

Uebergabe_Input = 			Uebergabe[:, 0:12]
#Uebergabe_Oberkoerper = 	Uebergabe[:, 12]
#Uebergabe_Ruecken = 		Uebergabe[:, 13]
#Uebergabe_Beine = 			Uebergabe[:, 14]

# Load the keras model and Model weights
Oberkoerper = keras.models.load_model("01-19-2021_02-35-30 Oberkoerper.h5")
Oberkoerper.load_weights("01-19-2021_16-23-24 Oberkoerper_weights.h5")

Ruecken = keras.models.load_model("01-19-2021_02-51-46 Ruecken.h5")
Ruecken.load_weights("01-19-2021_16-31-13 Ruecken_weights.h5")

Beine = keras.models.load_model("01-19-2021_03-01-38 Beine.h5")
Beine.load_weights("01-19-2021_12-29-51 Beine_weights.h5")

# make class predictions with the model
predictions_Oberkoerper = Oberkoerper.predict(Uebergabe_Input)
predictions_Ruecken = Ruecken.predict(Uebergabe_Input)
predictions_Beine = Beine.predict(Uebergabe_Input)
print('Oberkoerper => %f'   % (predictions_Oberkoerper[0]))
print('Ruecken => %f'       % (predictions_Ruecken[0]))
print('Beine => %f'         % (predictions_Beine[0]))