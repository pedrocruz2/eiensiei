extends Node2D
var a 
var b
var c
var x1
var x2
var delta
var deltanegativo
func _on_Button_pressed():	
	a = float($LineEdit.text)
	b = float($LineEdit2.text)
	c = float($LineEdit3.text)
	#basicamente colocando as variáveis como os inputs de a,b e c
	delta = (b*b-4*a*c)
	deltanegativo = (b*b-4*a*c)*-1
	#deltanegativo = -delta porque como a raiz de -x = raiz de x . i, -delta vai ser igual ao valor positivo (isso qnd o delta original for negativo)
	if delta<0:
		var parte_real
		var parte_imaginaria
#		$Label6.text = "x1 e x2 são raízes complexas!" (isso não daria resultado, apenas diria que são imaginarios)
		parte_real = -b/(2*a)
		parte_imaginaria = sqrt(deltanegativo)/(2*a)
		#Dividi em parte real e imaginária pq quero que o formato fique a +bi
		x1 = str(parte_real) + '+'+ str(parte_imaginaria) +"i"
		x2 = str(parte_real) + '-' + str(parte_imaginaria) + "i"
		$Label4.text = "x1 = " + x1
		$Label5.text = "x2 = " + x2
#		if float(x1) <0:
#			$Label6.text = "Forma fatorada: ("+x1+")"
#		else:
#			$Label6.text = "Forma fatorada: ("+x1*-1+")"
#		if float(x2)<0:
#			$Label7.text ="(" + x2+")"
		
	else:
		x1 = (-b + sqrt(delta))/(2*a)
		x2 = (-b - sqrt(delta))/(2*a)
		$Label4.text = "x1 = " +str(x1)
		$Label5.text = "x2 = " +str(x2)
		if float(x1) <0:
			$Label6.text = "Forma fatorada: (x+"+str(x1*-1)+")"
		else:
			$Label6.text = "Forma fatorada: (x-"+str(x1)+")"
		if float(x2) <0:
			$Label7.text = "(x+"+str(x2*-1)+")"
		else:
			$Label7.text = "(x-"+str(x2)+")"
			
	
