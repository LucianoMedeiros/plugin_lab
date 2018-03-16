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
        generateID: function(){},
        alert: function(args){},
        message: function(args){},
        html: function(args){},
        close: function(idModal, callback){},
        run: function(args){},
    }
};
```

## argumentos (args)
Cada function permite que seja passado um conjunto de argumentos para aumentar o poder de reutilização dos métodos.
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
> Todos o modais possuem um id único a fim de identificá-los. Principalmente em casos onde há mais de um modal na página. Eles são gerados internamento através da function *modal.generateID()*

#### className 
> Esse argumento é passado quando precisamos ter um modal com uma aparencia diferente.
#### title  
> aaa                     
#### message    
> aaa                   
#### selector  
> aaa                    
#### html    
> aaa                      
#### buttons   
> aaa                    
#### ajaxUrl   
> aaa                    
#### scrollTopOnOpen   
> aaa            
#### callbackFunctionNameOnClose   
> aaa

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
    message: "Hello world!", // obrigatório
    className: "modal-wellcome",
    scrollTopOnOpen: false // default TRUE
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
                   onclick="function (){ window.location.href = '/contactus' }"
                   >Contact Us</a>
            </div>
            <div class="grid-6">
                <a class="btn-home" 
                   href="http://www.site.com.br">Go to Home</a>
            </div>
        </div>
    </div>
<div>
```
## modal.message() 
## modal.html() 
## modal.close() 







