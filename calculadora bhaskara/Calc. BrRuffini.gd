extends Node2D

var grau: int = 0

var calcular = false
var contador = 0

var funcArray = []
var funcDisplay = ""

func _on_ButtonGrau_pressed():
	grau = int($Grau/InputGrau.text)
	print(grau)
	if grau > 0:
		$Array.visible = true
	
func _on_ButtonArray_pressed():
	funcArray.append($Array/InputArray.text)
	$Array/InputArray.text = ""
	print(funcArray)
	if len(funcArray) >= grau+1:
		$Array.visible = false
		$ArrayPreview.text = str(_calcular())
		pass
	if len(funcArray) >= 1:
		$Array/SkipInput.visible = true

func _on_SkipInput_pressed():
	funcArray.append(int(0))
	print(funcArray)
	if len(funcArray) >= grau+1:
			$Array.visible = false
			$ArrayPreview.text = str(_calcular())
			pass
			
func _calcular():
	calcular = 0
	for i in funcArray:
		if int(i) >= 0:
			if contador+1 == len(funcArray):
				if int(i) != 0:
					funcDisplay += "+" + str(i)
					print(i)
			elif contador+2 == len(funcArray):
				if int(i) == 1:
					funcDisplay += "+x "
				elif int(i) != 0:
					funcDisplay += "+" + str(i) + "x " 
			else:
				if contador != 0:
					if int(i) == 1:
						funcDisplay += str("+x" + "^",str((float(contador+1)-float(len(funcArray)))*-1))+" "
					elif int(i) != 0:
						funcDisplay += str("+" + str(i)+"x"+"^",str((float(contador+1)-float(len(funcArray)))*-1))+" "
				else:
					if int(i) == 1:
						funcDisplay += str("x" + "^",str((float(contador+1)-float(len(funcArray)))*-1))+" "
					elif int(i) != 0:
						funcDisplay += str(str(i)+"x"+"^",str((float(contador+1)-float(len(funcArray)))*-1))+" "
		elif int(i) < 0:
			if contador+1 == len(funcArray):
				funcDisplay += str(i)
			elif contador+2 == len(funcArray):
				funcDisplay += str(i) + "x " 
			else:
				if int(i) == -1:
					funcDisplay += str("-x" + "^",str((float(contador+1)-float(len(funcArray)))*-1))+" "
				else:
					funcDisplay += str(str(i) + "x" + "^",str((float(contador+1)-float(len(funcArray)))*-1))+" "
		contador += 1
	print(funcDisplay)
	return(funcDisplay)

func _on_ButtonDivisor_pressed():
	if float($Divisor/InputDivisor.text.get_slice("x", 0)) != 0:
		print("error")
	else :
		print((float($Divisor/InputDivisor.text.get_slice("x", 1))*-1))
