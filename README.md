# Sumarion

Este repositório contém o código que faz funcionar o **Sumarion**, uma solução em javascript puro para criar um painel lateral em documentos HTML contendo um sumário de links organizados em um arquivo json externo.

Esta solução foi desenvolvida para resolver o sumário de livros no formato HTML.

## Uso
inclua a seguinte linha de código no `<head>` do seu código html:

`<script src="https://www.ranoya.com/sumarion/sumarion.js"></script>`

ou inclua o arquivo `sumarion.js` e `default.css` no local de sua preferência, e aponte para o endereço onde os arquivos se encontram (alterando a linha 8 do código js onde ele insere o carregamento do css na página original).

Na pasta contendo os arquivos html que irão compor a lista de links no sumário, inclua um arquivo `index.json` com a seguinte sintaxe:

``` 
[ 
    {
		"capitulo": "Nome do capitulo",
		"topico": "nome do subcapitulo",
		"url": "http://urldoarquivo.html"
	},
	{
		"capitulo": "Nome do capitulo",
		"topico": "nome do subcapitulo",
		"url": "http://urldoarquivo.html"
	},
    etc
]
```

Para estilizar o sumário, utilize as seguintes entidades no seu CSS:

O id `#sumarioblock` é o bloco que se desloca contendo o sumário
````
#sumarionblock {

}
````

O id `#sumarionconteudo` é o bloco interno de `#sumarionconteudo` que contém os capítulos e links (subcapítulos):
````
#sumarionconteudo {

}
````

O elemento `#sumarionconteudo h2.capitulo` define os atributos dos capítulos:
````
#sumarionconteudo h2.capitulo {

}
````

O elemento `#sumarionconteudo a.topico` define os atributos dos links (subcapítulos):
````
#sumarionconteudo a.topico {

}

#sumarionconteudo a.topico:hover {

}
````

O elemento `#sumarionconteudo p.topico` define os atributos do link (subcapítulo) atual:
````
#sumarionconteudo p.topico {

}
````

O elemento `#sumarionlink` contém o ícone que abre/fecha o painel do sumário:
````
#sumarionlink {

}

#sumarionlink:hover {

}
````

O elemento `#sumarionicon` é o ícone dentro do link que abre/fecha o painel do sumário:
````
#sumarionicon {

}

#sumarionlink:hover {

}
````

## Exemplo
o link abaixo apresenta um exemplo funcionando com o **Sumarion**:
[https://www.ranoya.com/books/interfaces/interfaces.php](https://www.ranoya.com/books/interfaces/interfaces.php)
