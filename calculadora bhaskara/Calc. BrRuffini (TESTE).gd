extends Node2D

var grau: int = 0

var calcular = false
var contador = 0

var funcArray = []
var funcDisplay = ""

var value = 0
	
func _process(_delta):
	if value == 1:
		if Input.is_action_just_pressed("prima"):
			_on_ButtonArray_pressed()
	elif value ==0:
		if Input.is_action_just_pressed("prima"):
			_on_ButtonGrau_pressed()

func _on_ButtonGrau_pressed():
	grau = int($Grau/InputGrau.text)
	print(grau)
	if grau > 0:
		$Array.visible = true
		value = 1
	
func _on_ButtonArray_pressed():
	funcArray.append(float($Array/InputArray.text))
	$Array/InputArray.text = ""
	print(funcArray)
	if len(funcArray) >= grau+1:
		$Array.visible = false
		find_roots(funcArray)
		$ArrayPreview2.text = _calcular()
		pass
	if len(funcArray) >= 1:
		$Array/SkipInput.visible = true

func _on_SkipInput_pressed():
	funcArray.append(int(0))
	print(funcArray)
	if len(funcArray) >= grau+1:
			$Array.visible = false
			find_roots(funcArray)
			$ArrayPreview2.text = _calcular()
			pass
			
func _calcular():
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

func find_roots(coefficients: Array) -> Array:
	var degree = len(coefficients) - 1
	var roots = []
	
	#print(coefficients[degree], " ", degree)
	var p = divisors(int(coefficients[degree]))
	var q = divisors(int(coefficients[0]))
	
	var pq = []
	
	for i in q:
		for j in p:
			if not pq.has(j/float(i)):
				pq.append(j/float(i))
	
	for i in pq:
		if evaluate_polynomial(coefficients, i) == 0:
			roots.append(i)
	
	if len(roots) == 0:
		$ArrayPreview.text = "NENHUMA RAIZ ENCONTRADA (TODAS SAO COMPLEXAS?)"
	elif len(roots) != len(coefficients) - 1:
		$ArrayPreview.text = "RAIZ COMPLEXA OU DUPLA DETECTADA, RAIZES ENCONTRADAS:\n" + str(roots)
		
	else:
		$ArrayPreview.text = "TODAS RAIZES FORAM ENCONTRADAS:\n" + str(roots)
	return roots

func evaluate_polynomial(coefficients: Array, x: float) -> float:
	var degree = len(coefficients) - 1
	var result = 0
	
	for i in range(0, len(coefficients)):
		result += coefficients[degree-i]*pow(x, i)
	return result

func divisors(x: int) -> Array:
	var divisors = []
	var abs_x = abs(x)
	for i in range(1, abs_x+1):
		if abs_x % i == 0:
			divisors.append(i)
			divisors.append(-i)
	#print(divisors, x)
	return divisors
