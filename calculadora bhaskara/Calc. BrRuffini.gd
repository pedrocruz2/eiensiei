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
	if len(funcArray) >= grau:
		$Array.visible = false
		_calcular()
		pass

func _on_SkipInput_pressed():
	funcArray.append(int(0))
	print(funcArray)
	if len(funcArray) >= grau:
			$Array.visible = false
			_calcular()
			pass
			
func _calcular():
	for i in funcArray:
		funcDisplay += str(str(i)+"x"+str((float(contador+1)-float(len(funcArray)))*-1))
		contador += 1
		print(funcDisplay)
		

func _on_ButtonDivisor_pressed():
	if float($Divisor/InputDivisor.text.get_slice("x", 0)) != 0:
		print("error")
	else :
		print((float($Divisor/InputDivisor.text.get_slice("x", 1))*-1))
