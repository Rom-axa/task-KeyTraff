window.onload = function(){
    var wwh = new WWH(); 
    //Для работы поповеров
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    //Обработчик для переключения между страницами
    $('.uploaded-page-nav').on('click', '.nav-item .nav-link', function(){
        var page_id = $(this).data('page-id');
        wwh.switch_nav_active($(this), page_id);
    });
    //Обработчик для загрузки новых страниц ajax'ом
    $('nav.nav .nav-link').on('click', function(){
        var $this = $(this);
        var $query_name = $this.data('query-name');
        //получает инфу о странице из соседнего элемента, обрезая тег em
        var page_info = $($this.parent().children('.page-info')).data('original-title').replace(/<em>|<\/em>/g, '');
        if (wwh.hasPage($this.text())) {
            alert('Страница уже была загружена!');
            return false;
        }
        $.ajax({
            'url' : '',
            'method' : 'post',
            'data' : { 'get_data' : $query_name },
            'success' : function(data) {
                if(data[0] === undefined) {
                    this.error();
                    return false;
                }
                wwh.main(data, $this.text(), page_info);
            },
            'error' : function() {
                alert('page not found!');
            },
        });
        return false;
    });
};