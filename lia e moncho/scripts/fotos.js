//VARIABLES GLOBALES
var servidor_wivivo = 'http://aerowi-boda.ddns.net/';
//var servidor_wivivo = 'http://srv001.liveshowsync.local/';
//var servidor_wivivo = 'http://192.168.10.155/';
//alert (servidor_wivivo);
var webservice_wivivo = servidor_wivivo + 'liamoncho/'; 
var servidor_selfie = webservice_wivivo + 'leeThumbs.php';
var servidor_imagenes = webservice_wivivo + 'subido/';
var servidor_thumbs = webservice_wivivo + 'subido/thumbs/';
var servidor_thumb = webservice_wivivo + 'creaThumbImagen.php';
var servidor_sube = webservice_wivivo + 'sube.php';

//tiempos iteracion de bucles
var startselfiesettimeout = 30000;

//variables Selfie
var repeSelfie1 = null;
var nombreFoto = null;

function startSelfie(){
	var data;
    var val;
    var key;
	var newHTML1;
	navigator.notification.alert("hola",irInicio(),"llego hasta aqui", "OK");
    $.getJSON(servidor_selfie)
    	.done(function(data) {
            var newHTML1 = '';
        	$.each(data, function(key, val) {
        		var foto = val.foto;
            	var posicion = val.posicion;
            	newHTML1 = newHTML1+'<img src="'+servidor_thumbs+foto+'" /></button>';
        	});        
        	document.getElementById("tabstrip-selfie-fotos").innerHTML = newHTML1;
	    .fail(function(jqxhr, textStatus, error){
       		navigator.notification.alert("Proba de novo... parece que non dou conectado",irInicio(),"ERRO NA COMUNICACION", "OK");
    	});
    }
    repeSelfie1 = setTimeout(startSelfie, startselfiesettimeout);
};

// Cancela Selfie
function stopSelfie(){
    if (repeSelfie1 !== null) clearTimeout(repeSelfie1);
    repeSelfie1 = null;
};

function irInicio(){
    window.location.href='index.html';
};

//Fotos con "capture"
function captureImage() {
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
}

function captureSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	    var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
        // Show the captured photo.
        smallImage.src = mediaFiles[i].fullPath;
        var rutafoto1 = document.getElementById('rutafoto');
    	rutafoto1.innerHTML = '<p>quédache a foto eiquí: ' + mediaFiles[i].fullPath + '</p>';
	    var rutasubida1 = document.getElementById('rutasubida');
		rutasubida1.innerHTML = '<p>espera uns segundos a que sexa subida...</p>';
        uploadPhoto(mediaFiles[i]);
    }       
}

// Called if something bad happens.
function captureError(error) {
    navigator.notification.alert("Volve a saca-la foto", function(){},"ERRO EN CAPTURA", "OK");
}

//SUBE FOTO
function uploadPhoto(mediaFile) {
	var options = new FileUploadOptions();
	options.fileKey = "file";        
    options.fileName = makeId() + ".jpg";
    nombreFoto = options.fileName;
    options.mimeType = "image/jpeg";
	options.chunkedMode = false;
	options.headers = {Connection: "close"};
    var path = mediaFile.fullPath;
    var params = {};
    params.value1 = "Lia e Moncho";
    params.value2 = "davytan";
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(path, servidor_sube, uploadSuccess, uploadError, options, true);
}

function uploadSuccess(r) {
    $.get(servidor_thumb, {imagen:nombreFoto})
    .done(function(){
	    var rutasubida2 = document.getElementById("rutasubida");
		rutasubida2.innerHTML = '<p>FOTO SUBIDA OK!</p>';
        })
    .fail(function(){
        navigator.notification.alert("Saca a foto de novo. Houbo un erro",function(){}, "ERRO NA SUBIDA", "OK");
    });
}

function uploadError(error) {
    navigator.notification.alert("Saca a foto de novo. Houbo un erro",function(){}, "ERRO NA SUBIDA", "OK");
}

//nombre de imagen aleatorio
function makeId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
