# plugin_lab
Plugins criados do zero baseados em estudos e necessidades não atendidas em outros plugins

## front end (fe)
> Todos os plugins serão chamados a partir de um objeto denominado **fe** e logo você vai visualizá-lo em todos os plugins.
# modal
Este modal tem por objetivo de contemplar a maior parte de situações em que um *modal, lightbox, alert, popup* seja necessário.

## dependências
Este projeto possui dependências das seguintes bibliotecas:
* jquery  [*1.7+*](https://code.jquery.com/jquery/)
*  jquery.easing [*1.3+*](https://cdnjs.com/libraries/jquery-easing)
>A minha intenção não é reinventar a roda e sim ter ferramentas que me atendem. Logo, sempre que necessário, vou me valer de bons recursos disponíveis para facilitar a construção do mesmo. 

Vejamos a estrutura do mesmo:

```javascript
//Javascript
var fe = {
    modal: {
        alert: function(args){},
        message: function(args){},
        html: function(args){},
        close: function(idModal, callback){},
        run: function(args){},
        generateID: function(){}
    }
};
```

## Download
[Clique para baixar o pacote](http://www.site.com.br/plugins/dist/fe.zip)

## Instalação
```HTML
<!-- styles dentro da tag HEAD -->
<link rel="stylesheet" type="text/css" href="path-your-site/css/fe.min.css" />

<!-- scripts antes do fechamento do BODY -->
<script src="path-your-site/js/jquery-3.3.1.min.js"></script>
<script src="path-your-site/js/jquery-easing/1.4.1/jquery.easing.compatibility.js"></script>

<script src="path-your-site/js/fe.min.js"></script>
```

## argumentos (args)
Cada *function* permite que seja passado um conjunto de argumentos para aumentar o poder de reutilização dos métodos.
Existem argumentos que são obrigatórios e precisam ser observados.

Todos os argumentos são agrupados num objeto javascript e passados todos de uma vez como argumento.

Aqui dispomos uma tabela de onde cada argumento é usado:

args | alert() | mesage() | html() | close()
---- | ------- | -------- | ------ | -------
id                          | x | x | x | ✓
className                   | ✓ | ✓ | ✓ | x
title                       | x | ✓ | x | x
message                     | ✓ | ✓ | x | x
selector                    | x | x | ✓ | x
html                        | x | x | ✓ | x
buttons                     | ✓ | ✓ | x | x
ajaxUrl                     | x | x | ✓ | x
scrollTopOnOpen             | ✓ | ✓ | ✓ | ✓
callbackFunctionNameOnClose | ✓ | ✓ | x | ✓

#### id
> Todos o modais possuem um id único para identificá-los. Principalmente em casos onde há mais de um modal na página. Esse id é usado na função fechamento: *modal.close()*'.

#### className 
> Esse argumento é passado quando precisamos ter um modal com uma aparência diferente entre os modais.
#### title  
> Ele é usado quando usamos o modal do tipo *message()*. 
#### message    
> Argumento usado nos tipos *alert()* e *message()*.                   
#### selector  
> Argumento passado quando o conteudo do modal já existe na página e usado no modal tipo *html()*.                    
#### html    
> Objeto html passado quando o conteúdo é obtido por requisição *ajax*. 
#### buttons   
> Os botões não são obrigatórios. Você pode passar um objeto com as informações de cada botão, conforme exemplo a baixo: 
```javascript
//javascript
var _buttons = [
    {
        text: 'Button Text',
        className: 'cssClass',
        callback: function(){ }, //será adicionado no evento 'onclick'
        url: 'http://www.lorem.com' //será adicionado no 'href'
    }
];
``` 

#### ajaxUrl   
> URL do local onde está o conteúdo do modal.

#### scrollTopOnOpen   
> Este plugin faz com que além de abrir o modal, ele leva a posição do scroll da página para o início. Se quiser desabilitar esta função, user o valor ***false*** para este argumento.           
#### callbackFunctionNameOnClose   
> Você pode passar uma função para ser executada após o fechamento do modal *(callback)*, porém você deve passar o nome da função como *string*.

## modal.alert() 
### uso:
```javascript
//javascript
var _buttons = [
    {
        text: 'Contact Us',
        className: 'btn-portal',
        callback: function(){ window.location.href = "/contactus" }
    },
    {
        text: 'Go to Home',
        className: 'btn-home',
        url: 'http://www.site.com.br'
    }
];
var config = {
    message: "Hello world!",    // obrigatório
    className: "modal-wellcome",
    scrollTopOnOpen: false      // default TRUE
    buttons: _buttons,
    callbackFunctionNameOnClose: 'callbackFunctionName'
};

fe.modal.alert(config)
```
### código gerado 

```HTML
<!--HTML-->
<div class="bx-overlay modal_000"></div>
<div id="modal_000" class="bx-modal-area className">
    <div class="bx-modal">
        <div class="header">
            <a class="btn-close" 
               onclick="fe.modal.close('modal_000');" 
               title="Clique para fechar.">Fechar</a>
        </div>
        <div class="content">
            <p>Hello world!</p>
        </div>
        <div class="footer">
            <div class="grid-6">
                <a class="btn-portal" 
                   onclick="function() { window.location.href = '/contactus' }"
                   >Contact Us</a>
            </div>
            <div class="grid-6">
                <a class="btn-home" 
                   href="http://www.site.com.br">Go to Home</a>
            </div>
        </div>
    </div>
</div>
```
## modal.message() 
### uso:
```javascript
//javascript
var _buttons = [
    {
        text: 'Contact Us',
        className: 'btn-portal',
        callback: function() { window.location.href = "/contactus" }
    },
    {
        text: 'Go to Home',
        className: 'btn-home',
        url: 'http://www.site.com.br'
    }
];
var config = {
    title: "Modal title",       // obrigatório
    message: "Hello world!",    // obrigatório
    className: "modal-wellcome",
    scrollTopOnOpen: false      // default TRUE
    buttons: _buttons,
    callbackFunctionNameOnClose: 'callbackFunctionName'
};

fe.modal.alert(config)
```
### código gerado 

```HTML
<!--HTML-->
<div class="bx-overlay modal_000"></div>
<div id="modal_000" class="bx-modal-area className">
    <div class="bx-modal">
        <div class="header">
            <h1>Modal title</h1>
            <a class="btn-close" 
               onclick="fe.modal.close('modal_000');" 
               title="Clique para fechar.">Fechar</a>
        </div>
        <div class="content">
            <p>Hello world!</p>
        </div>
        <div class="footer">
            <div class="grid-6">
                <a class="btn-portal" 
                   onclick="function() { window.location.href = '/contactus' }"
                   >Contact Us</a>
            </div>
            <div class="grid-6">
                <a class="btn-home" 
                   href="http://www.site.com.br">Go to Home</a>
            </div>
        </div>
    </div>
</div>
```
## modal.html() 
### uso: 
```javascript
//Caso passe o html inteiro como parâmetro
var config1 = {
    html: object,
    className: 'modal-html'
};

//Caso passe o seletor do conteúdo do modal
var config2 {
    selector:'#modalConfirmacao', 
    className:'modal-confirmacao'
}

//Caso o html venha de outra fonte
var config3 {
    ajaxurl:'http://www.site.com.br/routerName?param=XYZ', 
    className:'modal-ajax'
}

fe.modal.html(config1);
```
### código gerado 

```HTML
<!--HTML-->
<div class="bx-overlay modal_000"></div>
<div id="modal_000" class="bx-modal-area className">
    <div class="bx-modal">
        <div class="header">
            <a class="btn-close" 
               onclick="fe.modal.close('modal_000');" 
               title="Clique para fechar.">Fechar</a>
        </div>
        <div class="content">
            <p>Hello world!</p>
        </div>
        <div class="footer">
            <div class="grid-6">
                <a class="btn-portal" 
                   onclick="function() { window.location.href = '/contactus' }"
                   >Contact Us</a>
            </div>
            <div class="grid-6">
                <a class="btn-home" 
                   href="http://www.site.com.br">Go to Home</a>
            </div>
        </div>
    </div>
</div>
```







