//WWH - Work With Html
;(function() {
    var WWH = function() {
        this.qty_pages_added = 0;//для id'шников элементов
        this.uploaded_pages = [];
        return this;
    }
    //Приватные методы----------------------------------------------------------
    var _this = {};
    //создаёт страницу с пустой таблицой
    _this.create_page_wrapper = function(page_id, page_info) {
        //context html-.card-body
        var tpl = '\
            <div id="!page_id!" class="response-wrapper d-none"> \n\
                <h1 class="card-title">!page_info!</h1>          \n\
                <table class="table">                            \n\
                    <thead class="thead-light">                  \n\
                    </thead>                                     \n\
                    <tbody>                                      \n\
                    </tbody>                                     \n\
                </table>                                         \n\
            </div>                                               \n\
        ';
        tpl = tpl.replace(/!page_id!/g, page_id);
        tpl = tpl.replace(/!page_info!/g, page_info);
        $(this).append(tpl);
        return $('#' +page_id);
    };
    //создаёт переключатель(ссылку) на страницу
    _this.append_nav_page_link = function(page_name, page_id) {
        //context html-.uploaded-page-nav
        var tpl = ' \n\
            <li id="parent_nav_!page_id!" class="nav-item">                                                      \n\
                <a id="child_nav_!page_id!" data-page-id="!page_id!" class="nav-link" href="#">!page_name!</a> \n\
            </li>                                                                                                \n\
        ';
        tpl = tpl.replace(/!page_name!/g, page_name);
        tpl = tpl.replace(/!page_id!/g, page_id);
        $(this).append(tpl);;
    };
    //наполняет шапку таблицы, со значениями === ключем row
    _this.append_head_in_table = function(row) {
        //context html-thead!!!
        var str;
        for (var key in row) {
            str += '<th scope="col">' +key+ '</th>';
        }
        $(this).append('<tr>' +str+ '</tr>');
    };
    //наполняет ряды таблицы, со значениями === значениями row
    _this.append_row_in_table = function(row) {
        //context html-tbody!!!
        var str = '';
        for (var key in row) {
            str += '<td>' +row[key]+ '</td>';
        }
        $(this).append('<tr>' +str+ '</tr>');
    };
    
    //----------------------------------------------------------Приватные методы
    
    //Публичные методы----------------------------------------------------------
    //генерирует html код
    WWH.prototype.main = function(rows, page_name, page_info) {
        if (this.hasPage(page_name)) {
            return false;
        }
        //если это первая скаченная страница - очищает div-контейнер со страницами
        if( this.qty_pages_added === 0 ) {
            $('#pages-container').empty();
        }
        var page_id = 'page_' + this.qty_pages_added;
        _this.create_page_wrapper.call($('#pages-container'), page_id, page_info);
        _this.append_nav_page_link.call($('.uploaded-page-nav'), page_name, page_id);
        _this.append_head_in_table.call($('#' +page_id+ ' table thead'), rows[0]);
        
        for (var i = 0;i < rows.length; i++) {
            _this.append_row_in_table.call($('#' +page_id+ ' table tbody'), rows[i]);
        }
        //переключит скаченную страницу
        $('#child_nav_' +page_id).click();
        
        this.uploaded_pages.push(page_name);
        this.qty_pages_added++;
        return true;
    };
    //проверяет была ли загружена страница с page_name
    WWH.prototype.hasPage = function(page_name) {
        if (this.uploaded_pages.indexOf(page_name) !== -1) {
            return true;
        }
        return false;
    }
    //переключает страницы
    WWH.prototype.switch_nav_active = function($el, page_id) {
        var links = $('.uploaded-page-nav .nav-item .nav-link');
        for (var i = 0;i < links.length; i++) {
            if ($(links[i]).hasClass('active')) {
                $(links[i]).removeClass('active');
            }
        }
        var page_wrappers = $('#pages-container .response-wrapper');
        for (var i = 0;i < page_wrappers.length; i++) {
            if (!$(page_wrappers[i]).hasClass('d-none')) {
                $(page_wrappers[i]).addClass('d-none');
            }
        }
        
        $el.addClass('active');
        $('#' +page_id).removeClass('d-none');
    }
    //----------------------------------------------------------Публичные методы
    window.WWH = WWH;
})();


