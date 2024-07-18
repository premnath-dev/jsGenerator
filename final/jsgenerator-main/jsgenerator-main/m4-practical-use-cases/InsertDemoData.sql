DELIMITER //

CREATE PROCEDURE InsertDemoData()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 1000 DO
    INSERT INTO products (name, description, price, stock_quantity, created_at) 
    VALUES (CONCAT('Product ', i), CONCAT('Description for product ', i), ROUND(RAND() * 1000, 2), FLOOR(RAND() * 100), NOW());
    SET i = i + 1;
  END WHILE;
END //

DELIMITER ;

CALL InsertDemoData();
