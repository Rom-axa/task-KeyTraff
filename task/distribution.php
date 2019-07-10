<?php

class ChildClass
{
    private function getQuery()
    {
        return [
            [
                'id' => '100',
                'filial_id' => '1',
                'percent' => '10',
            ],
            [
                'id' => '101',
                'filial_id' => '2',
                'percent' => '0',
            ],
            [
                'id' => '102',
                'filial_id' => '3',
                'percent' => '0',
            ],
            [
                'id' => '103',
                'filial_id' => '4',
                'percent' => '0',
            ],
        ];
    }
    private function calcPercent($arr)
    {
        $sum = 0;
        
        foreach ($arr as &$percent) {
            $percent = (int)$percent >= 0 ? (int)$percent : 0;
            switch (true) {
                case $sum+$percent > 100 :
                    $percent = 100-$sum;
                    $sum += $percent;
                    break;
                case $sum+$percent <= 100 : 
                    $sum += $percent;
                    break;
                case $sum === 0:
                    $percent = 0;
                    break;
            }
        }
        
        if ($sum !== 100) {
            $arr[key($arr)] += 100-$sum; 
        }
        
        return $arr;
    }
    public function main($filialp)
    {
        $filials = $this->getQuery();
        $filialp = $this->calcPercent($filialp);
        $insert_array = [];
        
        $sum = 0;
        foreach ($filials as &$filial) {
            $filial['percent'] = $filialp[$filial['id']] ?: 0;
            $sum += $filial['percent'];
        }
        if ($sum !== 100) {
            $filials[key($filials)]['percent'] += 100-$sum;
        }
        
        
        echo '<pre>';
        var_dump($filials);
        die();
    }
}

$child = new ChildClass();
$arr = [
    '100' => '20',
    '101' => '10',
    '102' => '30',
    '101a' => '15',
    'key5' => '15',
    'key6' => '10',
];
$child->main($arr);

