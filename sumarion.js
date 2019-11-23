/**
 * 
 * SUMARION
 * Guilherme Ranoya
 *
 */

document.write('<link rel="stylesheet" type="text/css" href="https://www.ranoya.com/sumarion/default.css">');

/*
 * Variáveis e contexto
 */

var sumariojson = "index.json";
var menuisopen = false;
var menutype = "default";
var scroll = 0;

var ismobile = "false";
w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
if (w<650) {
ismobile = "true";
}



/*
 * Funções
 */

// captura variáveis da URL
function getparam(p,fallback,anyurl) {

	  if (anyurl == "" || anyurl == null) {
	  	turl = String(window.location);
	  } else {
	  	turl = String(anyurl);
	  }

      grupo = "";

      if (turl.indexOf(p+"=") >= 0) {
            iniciogrupo = turl.substring(turl.indexOf(p+"="));
            if (iniciogrupo.indexOf('&') >= 0) {
                  grupo = iniciogrupo.substring(p.length+1,iniciogrupo.indexOf('&'));
            } else {
                  grupo = iniciogrupo.substring(p.length+1);
            }
      } else {
            grupo = fallback;
      }
      return grupo;

}

// inclui o sumário e separa o conteudo em uma div no DOM
function fazenchertoinicial() {

	original = document.body.innerHTML;
    prehtml = '<div id="sumarionblock"><div id="sumarionconteudo"></div></div><a href="javascript:changesumarionstate();" id="sumarionlink"><svg id="sumarionicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="30" stroke-width="20" /></svg></a><div id="conteudodocumento">';
    poshtml = "</div>";
    encherto = prehtml + original + poshtml;
    document.body.innerHTML = encherto;

}

// abre ou fecha o sumário
function changesumarionstate() {

	console.log("abrindo/fechando sumário");
  w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  tamanhoSumarion = "360px";

  if (w < 550) {
    tamanhoSumarion = "100vw";
  }

	if (menuisopen) {
		menuisopen = false;

		if (menutype == "default") {
		document.getElementById('sumarionblock').style.right = "-" + tamanhoSumarion;
    document.getElementById('sumarionblock').style.width = tamanhoSumarion;
		document.getElementById('conteudodocumento').style.marginLeft = 0;
		}

	} else {
		menuisopen = true;

		if (menutype == "default") {
		document.getElementById('sumarionblock').style.right = 0;
    document.getElementById('sumarionblock').style.width = tamanhoSumarion;
		document.getElementById('conteudodocumento').style.marginLeft = "-" + tamanhoSumarion;
		}

	}

}


// carrega json e popula dados
function carregadados() {

fetch(sumariojson).then(response => response.json()).then((data) => {

    document.getElementById('sumarionconteudo').innerHTML = apresentaElementos(data);

    });

}


// constroi código html do sumário
function apresentaElementos(json) {

	codigohtml = "";
	captold = "";
	capatual = "";
	jsonurlL = "";
	jsonurlR = "";
	brwurlL = "";
	brwurlR = "";

	for (i = 0; i<json.length; i++) {

	   capatual = json[i].capitulo;
            
       if(captold != capatual) {

          codigohtml = codigohtml + "<h2 class='capitulo'>" + json[i].capitulo + "</h2>";
          captold = capatual;

       }

       jsonurlL = json[i].url;

       if (json[i].url.indexOf("http://") > 0) {

       	jsonurlL = json[i].url.substring(7);

       }

       if (json[i].url.indexOf("https://") > 0) {

       	jsonurlL = json[i].url.substring(8);

       }

       if (jsonurlL.indexOf("?") > 0) {

       	jsonurlR = jsonurlL.substring(0,jsonurlL.indexOf("?"));

       } else {

       	jsonurlR = jsonurlL;

       }

       brwurlL = String(window.location);

       if (String(window.location).indexOf("http://") > 0) {

       	brwurlL = String(window.location).substring(7);

       }

       if (String(window.location).indexOf("https://") > 0) {

       	brwurlL = String(window.location).substring(8);

       }

       if (brwurlL.indexOf("?") > 0) {

       	brwurlR = brwurlL.substring(0,brwurlL.indexOf("?"));

       } else {

       	brwurlR = brwurlL;

       }

       if (jsonurlR == brwurlR) {

       	  codigohtml = codigohtml + "<p class='topico estapagina'>" + json[i].topico + "</p>";
       
       } else {

       	  codigohtml = codigohtml + "<a href='" + json[i].url + "' class='topico'>" + json[i].topico + "</a>";

   	   }

            
    }

    return codigohtml;

}







/*
 * Ao carregar o documento
 */

document.addEventListener("DOMContentLoaded", function(event) {

	fazenchertoinicial();
	carregadados();
	document.getElementById("conteudodocumento").addEventListener("scroll", function() {
		scroll = this.scrollTop;

    // Se uma função docScroll(int) for definida, ela será chamada quando houver scroll
    if(typeof(docScroll) != "undefined") {
		docScroll(scroll);
    }

	});
   
});


/*
 * Ao fazer resize
 */

window.addEventListener("resize", function() {

  w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
  // Se uma função docResize(int,int) for definida, ela será chamada quando houver resize
  if(typeof(docResize) != "undefined") {
    docResize(w,h);
  }

  w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  
  // Redimensiona o sumarion caso ele esteja aberto
  if (menuisopen) {

    tamanhoSumarion = "360px";

    if (w < 550) {
      tamanhoSumarion = "100vw";
    }

    if (menutype == "default") {
      document.getElementById('sumarionblock').style.right = 0;
      document.getElementById('sumarionblock').style.width = tamanhoSumarion;
      document.getElementById('conteudodocumento').style.marginLeft = "-" + tamanhoSumarion;
    }

  }

});




