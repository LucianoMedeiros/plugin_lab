var fe = {
    init: function() {
    },
    modal: {
        generateID: function() {
            return 'modal_' + parseInt(Math.random() * 1000);
        },
        alert: function(config) {
            var params = config;
            if (!params.message) {
                console.log('Parâmetro "message" não definida.');
                alert("Ops! - Algum parâmetro não foi definido. Procure suporte técnico.");
            } else {
                params.id = fe.modal.generateID();
                params.className = 'bx-modal-alert';
                delete params['title'];
                delete params['html'];
                delete params['ajaxUrl'];

                this.run(params);
            }
        },
        message: function(config) {
            var params = config;
            if (!params.title || !params.message) {
                console.log('Parâmetros "title" ou "message" não definidos.');
                alert("Ops! - Algum parâmetro não foi definido. Procure suporte técnico.");
            } else {
                params.id = fe.modal.generateID();
                params.className = 'bx-modal-message';
                delete params['html'];
                delete params['ajaxUrl'];
                this.run(params);
            }
        },
        html: function(config) {
            var params = config;

            if (!params.className) {
                console.log('Parâmetro "className" não definidos.');
                alert("Ops! - Algum parâmetro não foi definido. Procure suporte técnico.");
            } else {
                if (params.html) { //{HTML, CLASS}
                    this.run(params);
                } else if (params.selector) { //{ SELECTOR, CLASS} 
                    params.html = $(params.selector).html();
                    this.run(params);
                } else if (params.ajaxUrl) { //{ AJAXURL, CLASS} 
                    var jqxhr = $.get(params.ajaxUrl)
                        .done(function(data) {
                            params.html = data;
                            this.run(params);
                        })
                        .fail(function() {
                            alert("Ops. Erro ao carregar o html");
                        });
                } else {
                    console(
                        'Param html: ' + params.html + '/n' +
                        'Param selector: ' + params.selector + '/n' +
                        'Param ajaxUrl: ' + params.ajaxUrl
                    );
                    console.log('Algum parâmetro não foi definido.');
                    alert("Ops! - Algum parâmetro não foi definido. Procure suporte técnico.");
                }
            }
        },
        close: function(idModal, callback) { //{ callback name, created in window.callbackName }}
            var modal = idModal ? $('#' + idModal) : $('.bx-modal-area');
            var overlay = idModal ? $('.bx-overlay.' + idModal) : $('.bx-overlay');
            $(modal).fadeOut(400, function() {
                $(overlay).fadeOut(400, function() {
                    $(modal).remove();
                    $(overlay).remove();
                    $('html, body').animate({ 'scrollTop': 0 }, 600);
                    if (callback) {
                        window[callback]();
                    }
                });
            });
        },
        run: function(config) {
            var params = config;

            var html = {
                containerID: (function() { var _html = '<div id="' + params.id + '" class="bx-modal-area ' + params.className + '">'; return _html; })(),
                title: (function() { var _html = params.title ? '<h1>' + params.title + '</h1>' : ''; return _html; })(),
                close: (function() { var _html = params.callbackClose ? '<a class="btn-close" onclick="fe.modal.close(\'' + params.id + '\' , \'' + params.callbackClose + '\');" title="Clique para fechar.">Fechar</a>' : '<a class="btn-close" onclick="fe.modal.close(\'' + params.id + '\');" title="Clique para fechar.">Fechar</a>'; return _html; })(),
                buttons: (function() {
                    var  _html = '',
                         _call = '',
                          _url = '',
                        _close = '';

                    if (params.buttons && params.buttons.length > 1) {
                        $(params.buttons).each(function(i, el) {
                            _call = '<div class="grid-' + (12 / params.buttons.length) + '"><a class="' + el.className + '" onclick="' + el.callback + '">' + el.text + '</a></div>';
                            _url = '<div class="grid-' + (12 / params.buttons.length) + '"><a class="' + el.className + '" href="' + el.url + '">' + el.text + '</a></div>';
                            _close = '<div class="grid-' + (12 / params.buttons.length) + '"><a class="' + el.className + '" onclick="fe.modal.close()">' + el.text + '</a></div>';
                            _html += el.callback ? _call : el.url ? _url : _close;
                        });
                    } else if (params.buttons && params.buttons.length === 1) {
                        _call = '<a class="' + params.buttons.className + '" onclick="' + params.buttons.callback + '">' + params.buttons.text + '</a>';
                        _url = '<a class="' + params.buttons.className + '" href="' + params.buttons.url + '">' + params.buttons.text + '</a>';
                        _close = '<a class="' + params.buttons.className + '" onclick="fe.modal.close()">' + params.buttons.text + '</a>';
                        _html += params.callback ? _call : params.url ? _url : _close;
                    }
                    return _html;
                })(),
                overlay: (function() { var _html = '<div class="bx-overlay ' + params.id + '"></div>'; return _html; })(),
                content: (function() { var _html = params.html ? params.html : '<p>' + params.message + '</p>'; return _html; })()
            };

            var _html = html.overlay +
                    html.containerID +
                    '<div class="bx-modal">' +
                        '<div class="header">' +
                            html.title +
                            html.close +
                        '</div>' +
                        '<div class="content">' +
                            html.content +
                        '</div>' +
                        '<div class="footer">' +
                            html.buttons +
                        '</div>' +
                        '</div>' +
                    '</div>';

            $('body').append(_html);
            if(params.scrollTopOnOpen !=  false) {
                var pos = $('.bx-modal').offset().top;
                $('html, body').animate({ 'scrollTop': pos }, 600);
            }
            else {
                $('.bx-modal-area').css('position', 'fixed');
            }

        }
    }
};

$(document).ready(function() {
    fe.init();
});