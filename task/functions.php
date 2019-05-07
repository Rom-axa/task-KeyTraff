<?php

//запрос к бд , данные для подключения в config.php
//@param string $query запрос с плэйсхолдерами, 
//@param array $options набор ключ-значение = плэйсхолдер-значеие 
//или плэйсхолдер-массив в котором параметр 'value' - значение и 
//'type' - константа PDO определяющая тип данных значения ключа 'value'
//примеры
//q('SELECT * FROM `users` WHERE `username` = :username', [
//    ':username' => [
//        'value' => 'igor',
//        'type' => PDO::PARAM_STR
//    ]
//]);
//q("SELECT * FROM `users` WHERE `username` = :username", [
//    ':username' => 'ALEX',
//]);

function q($query, array $options = [])
{
    try {
        $dsn = "mysql:host=" .HOST. ";dbname=" .DATABASE;
        $pdo = new PDO($dsn, USER, PASSWORD);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare($query);
        if (!empty($options)) {
            foreach ($options as $placeholder => $value) {
                if (is_array($value)) {
                    $stmt->bindValue($placeholder, $value['value'], $value['type']);
                } else {
                    $stmt->bindValue($placeholder, $value, PDO::PARAM_STR);
                }
            }
        }

        $res = $stmt->execute();
        return $res? $stmt->fetchAll(PDO::FETCH_ASSOC) : FALSE;
    } catch(PDOException $e) {
        exit($e->getMessage());
    }
}
function send_ajax_response($data)
{
    $json_data = json_encode($data);
    if (!$json_data) {
        $json_data = '[]';
    }
    header('Content-Type: application/json; charset=utf-8;');
    echo $json_data;
    exit();
}
