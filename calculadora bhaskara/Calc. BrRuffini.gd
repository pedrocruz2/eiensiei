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
	var arrayAppender:Vector2
#	arrayAppender.y = float($Array/InputArray.text.get_slice(',',1))
	arrayAppender.x = float($Array/InputArray.text)
	funcArray.append(arrayAppender)
	$Array/InputArray.text = ""
	print(funcArray)
	if len(funcArray) >= grau+1:
		$Array.visible = false
		durand_kerner(funcArray)
		pass
	if len(funcArray) >= 1:
		$Array/SkipInput.visible = true

func _on_SkipInput_pressed():
	funcArray.append(int(0))
	print(funcArray)
	if len(funcArray) >= grau+1:
			$Array.visible = false
			durand_kerner(funcArray)
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


func polynomial(z, coefficients):
	var n = len(coefficients) - 1
	var t = Vector2(0, 0) #= coefficients[n]

	for k in range(0,len(coefficients)-1):
#		print("START NEW FOR WITH K VALUE OF ", k)
		var coeffs = coefficients[k]
#		print("coeffs: ", coeffs)
#		print("for x: ", z)
		var coeffsComplex = Complex.new(coeffs.x, coeffs.y)
		
		var zComplex = Complex.new(z.x, z.y)
		var power = zComplex.pow((n-k))
#		print(Vector2(zComplex.real,zComplex.imag), " to the power of ",(n-k)," is ",Vector2(power.real,power.imag))
		var termC = coeffsComplex.mul(power)
		var term = Vector2(termC.real, termC.imag)
#		print(coeffs, "times ", Vector2(power.real, power.imag), "is equals to term: ", term)
		
		t +=term
#		print("t: ", t)
	for k in range(len(coefficients)-1,len(coefficients)):
		var coeffs = coefficients[k]
		var term = coeffs
		t += term
	return t
	
func durand_kerner(coefficients) -> Array:
	var n = len(coefficients) - 1 # degree of polynomial
	var roots = []
	for i in range(n):
		roots += [Vector2(0,0)] # initialize list of roots
#	var bnd = bound(coefficients)
	var eps = 1e-3 # tolerance
	
#	for i in range(n):
#		var theta = (2.0 * PI * i)/n
#		roots[i] = Vector2(cos(theta),sin(theta))
#	print("root guess: ", roots)
	
#	for i in range(n):
#		var r = randf()
#		var theta = 2.0 * PI * randf()
#		roots[i] = Vector2(r*cos(theta), r*sin(theta))
#	print("root guess: ", roots)



	var retry = true
	var itCtr = 0
	while retry and itCtr < 1000:
		for i in range(n):
			var r = randf()
			var theta = 2.0 * PI * randf()
			roots[i] = Vector2(r*cos(theta), r*sin(theta))
		print("root guess: ", roots)
		
		retry = false
		itCtr = 0
	# set initial guesses as equally spaced points on the unit circle
		var rootsNew = roots.duplicate()
		var flag = true
		while flag and itCtr < 1000:
			flag = false
			for k in range(n):
				var temp = Vector2(1.0,1.0)
				var tempComplex
				
				for j in range(n):
					if j != k:
						temp *= (roots[k] - roots[j])
				tempComplex = Complex.new(temp.x,temp.y)
				var pForX = polynomial(roots[k], coefficients)
				var pForXComplex = Complex.new(pForX.x, pForX.y)
				var fractionComplex = pForXComplex.div(tempComplex)
				var fraction = Vector2(fractionComplex.real, fractionComplex.imag)
				rootsNew[k] = roots[k] - fraction
				var rootSubs:Vector2 = (roots[k] - rootsNew[k])
				if abs(rootSubs.x) > eps or abs(rootSubs.y) > eps: # eps = tolerance
					# print abs(roots[k] - rootsNew[k])
					flag = true
				else:
					#print("RootSubs ",rootSubs, " RootsNewK ", rootsNew[k],"RootsK ", roots[k])
					pass
				if is_nan(rootsNew[k].x) or is_nan(rootsNew[k].y): # math.isnan() = is_nan()
					flag = false
					retry = true
					print('retrying...')
					break
			roots = rootsNew.duplicate()
			itCtr += 1
			$ArrayPreview.text = str("iteration #",itCtr)
			print("iteration #",itCtr)
			yield(get_tree().create_timer(0.05), "timeout")
	print("converged or reached iter 1000")
	print("iteration count: ", itCtr)
	print("raw: ",roots)
	for i in len(roots):
		roots[i].x = round(roots[i].x)
		roots[i].y = round(roots[i].y)
	print("round: ", roots)
	$ArrayPreview.text = str(roots)
	return roots
