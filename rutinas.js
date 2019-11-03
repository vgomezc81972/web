var FormatoFecha = "AAAA-MM-DD";
var SepMiles = ",";
var SepDecimal = ".";
var AnoInicial = 1870;
var AnoFinal = 2060;

var Rutinas = {
  Version: '1.0.0.3',

  Browser: {
    IE:     !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
    Opera:  navigator.userAgent.indexOf('Opera') > -1,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  }
};


function validarTecla(event,li_tipo){
   var tecla = (document.all) ? event.keyCode : event.which; 
    if (tecla==8) return true; 
    if (tecla==0) return true; 
    
    
    if (event.ctrlKey){
      return true;
    }
    if (event.altKey){
      return true;
    }

    // retornar si las teclas son enter , tab o shit
    if (tecla==9){
       return true;
    }
	
    if (tecla==13  && li_tipo != "ALSE" ){
      if (Rutinas.Browser.IE){
        event.returnValue=false;
      }
      else {       
        event.preventDefault();
      }  
	  return true;
    }
    
    var patron =""; 
    switch(li_tipo){
		case "LE": // Permite unicamente letras, espacio blanco, ñ, Ñ, tilde de vocales mayusculas y minusculas
                  patron = /[A-Za-z_ ]/; 
			break;
		case "AL": // Elimina Unicamente comilla y doble comilla
		case "ALSE": // Elimina Unicamente comilla y doble comilla
		case "NO": // Permite unicamente numeros y letras
                  patron = /[A-Za-z0-9{}_áéíóúñÑ;,:.!#@$%&/()=?¡"\s-]/; 
			break;
		case "F2": // Unicamente permite numeros y el /
                  patron =/[0123456789/]/; 
			break;
		case "FE": // Unicamente permite numeros y el -
                  patron =/[0123456789-]/; 
			break;
		case "EM": // Unicamente permite numeros y el -
                  patron =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
			break;
		case "EN": // Unicamente permite numeros
                  patron = /\d/;  
			break;
		case "DE": // Permite numeros y el punto decimal
                  patron =/[0123456789.-]/; 
			break;
		case "HO": // Unicamente permite numeros y el :
                  patron =/[0123456789:]/; 
			break;
    }	
    var te = String.fromCharCode(tecla); 
    if (patron.test(te)==false ){
      if (Rutinas.Browser.IE){
        event.returnValue=false;
      }
      else {       
        event.preventDefault();
      }       
    }
}


function validarEmail(email) 
{
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
       return (true)
     }
     return (false);
}  

function alerta()
    {
    var mensaje;
    var opcion = confirm("Digite en Aceptar o Cancelar");
    if (opcion == true) {
        mensaje = "Has Digitado OK";
	} else {
	    mensaje = "Has Digitado Cancelar";
	}
	document.getElementById("ejemplo").innerHTML = mensaje;
}

function showBusiness() {
    var title = ["Apps Móviles", "Diseño de Sitios", "UI/UX"];
    var classIcon = ["glyphicon-phone", "glyphicon-globe", "glyphicon-eye-open"];
    var description = ["Diseñamos y desarrollamos aplicaciones móviles y usables para todos los sectores.", "Construimos página web a la medida sinedo usuables, interactivas y rápidas.", "Realizamos consultorías para usabilidad de sitios web y aplicaciones."];
    var i;
    var text = "";
    for (i = 0; i < title.length; i += 1) {
        text += "<div class='itemBusiness'><span class='glyphicon " + classIcon[i] + "' aria-hidden='true'></span><h3>" + title[i] + "</h3><p>" + description[i] + "</p></div>";
    }
    document.getElementById("sectionBusiness").innerHTML = text;
}

function showMenu() {
    var values = ["Inicio", "Indicadores", "Registro Movimiento", "Registro Analisis y Estrategias", "Hoja de Vida del Indicador"];
    var links = ["./general.html", "./Indicadores.html", "./movimiento.html", "./analisis.html", "./HojaVidaP.html"];
    var i = 0;
    var text = "";
    while (values[i]) {
        text += "<a class='itemMenu' href='" + links[i] + "'>" + values[i] + "</a>";
        i += 1;
    }
    document.getElementById("showMenu").innerHTML = "<div id='overlayMenu' class='animated bounce'></div>";
    document.getElementById("overlayMenu").innerHTML = text;
}


function agregar_movimiento(){
  cont++;
  var _oid = document.getElementById("oid").value;
  var _cod = document.getElementById("codigoIndicador").value;
  var _num = document.getElementById("numerador").value;
  var _den = document.getElementById("denominador").value;
  
  if(_num.trim()==''){
     alert("Ingrese numerador");
  }
    
  var fila='<tr class="selected" id="fila'+cont+'" onclick="seleccionar(this.id);"><td>'+cont+'</td><td>'+_oid+'</td><td>'+_cod+'</td><td>'+_num+'</td><td>'+_den+'</td></tr>';
  $('#tabla').append(fila);
  reordenar();

}

function agregar_analisis(){
  cont++;
  var _oid = document.getElementById("oid").value;
  var _cod = document.getElementById("codigoIndicador").value;
  var _ana = document.getElementById("analisis").value;
  var _est = document.getElementById("estrategias").value;
  
  if(_ana.trim()==''){
     alert("Ingrese analisis");
  }
    
  var fila='<tr class="selected" id="fila'+cont+'" onclick="seleccionar(this.id);"><td>'+cont+'</td><td>'+_oid+'</td><td>'+_cod+'</td><td>'+_ana+'</td><td>'+_est+'</td></tr>';
  $('#tabla').append(fila);
  reordenar();

}
	
function seleccionar(id_fila){
	if($('#'+id_fila).hasClass('seleccionada')){
		$('#'+id_fila).removeClass('seleccionada');
	}
	else{
		$('#'+id_fila).addClass('seleccionada');
	}
	id_fila_selected=id_fila
}

function eliminar(id_fila){
   $('#'+id_fila).remove();	
   reordenar();
}


function reordenar(){
	var num=1;
	$('#TableBody tbody tr').each(function(){
	   $(this).find('td').eq(0).text(num);
	num++;
	});
}