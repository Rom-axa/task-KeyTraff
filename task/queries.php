<?php
const SQL_TASK_QUERY_FIRST = '
    SELECT `r`.`id` `request_code`, `of`.`name` `offer_name`, `r`.`price`, `r`.`count` `quantity`, `o`.`name` `operator`
        FROM `requests` `r`
    RIGHT JOIN `offers` `of`
        ON `of`.`id` = `r`.`offer_id`
    RIGHT JOIN `operators` `o`
        ON `o`.`id` = `r`.`operator_id`
    WHERE `r`.`count` > 2
        AND `o`.`id` IN (10, 12)
';
const SQL_TASK_QUERY_SECOND = '
    SELECT `of`.`name`, SUM(`r`.`count`) `quantity`, SUM(`r`.`price`) `price`
	FROM `requests` `r`
    LEFT JOIN `offers` `of`
	ON `of`.`id` = `r`.`offer_id`
    GROUP BY `of`.`id`  
';

