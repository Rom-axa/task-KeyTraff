<?php
error_reporting(0);

include_once 'config.php';  //для подключение к бд
include_once 'functions.php'; //функции
include_once 'queries.php'; //подготовленные запросы 

if (isset($_POST['get_data'])) {
    
    switch ($_POST['get_data']) {
        case 'first_query' :
            $rows = q(SQL_TASK_QUERY_FIRST);
            send_ajax_response($rows);
        case 'second_query' :
            $rows = q(SQL_TASK_QUERY_SECOND);
            send_ajax_response($rows);
        default :
            send_ajax_response([]);
    }
    
}

header('Content-type: text/html; charset=utf-8;');
include 'index.html';