# import sys
from numpy import loadtxt
from tensorflow import keras

# load the dataset

Uebergabe = loadtxt('./python-ki/Uebergabe.csv', delimiter=',')

Uebergabe_Input = Uebergabe[:, 0:12]
# Uebergabe_Oberkoerper = 	Uebergabe[:, 12]
# Uebergabe_Ruecken = 		Uebergabe[:, 13]
# Uebergabe_Beine = 			Uebergabe[:, 14]

# Load the keras model and Model weights

Oberkoerper = keras.models.load_model(
    "./python-ki/01-19-2021_02-35-30_Oberkoerper.h5")
Oberkoerper.load_weights(
    "./python-ki/01-19-2021_16-23-24_Oberkoerper_weights.h5")
Ruecken = keras.models.load_model("./python-ki/01-19-2021_02-51-46_Ruecken.h5")
Ruecken.load_weights("./python-ki/01-19-2021_16-31-13_Ruecken_weights.h5")
Beine = keras.models.load_model("./python-ki/01-19-2021_03-01-38_Beine.h5")
Beine.load_weights("./python-ki/01-19-2021_12-29-51_Beine_weights.h5")

# make class predictions with the model
predictions_Oberkoerper = Oberkoerper.predict(Uebergabe_Input)
predictions_Ruecken = Ruecken.predict(Uebergabe_Input)
predictions_Beine = Beine.predict(Uebergabe_Input)
# print('Beine => %d' % (predictions_Beine[0]))
# print('Ruecken => %d' % (predictions_Ruecken[0]))
# print('Oberkoerper => %d' % (predictions_Oberkoerper[0]))


# print(predictions_Beine[0])
# print(predictions_Ruecken[0])
# print(predictions_Oberkoerper[0])


ismax = max(predictions_Ruecken[0],
            predictions_Oberkoerper[0], predictions_Beine[0])

if predictions_Ruecken[0] == ismax:
    print(2)
elif predictions_Oberkoerper[0] == ismax:
    print(3)
elif predictions_Beine[0] == ismax:
    print(1)
