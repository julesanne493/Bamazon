DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT DEFAULT 0,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 4, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hoodie", "Clothing", 15, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vanilla Buttercream Cake", "Bakery", 18, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate Chip Cookies", "Bakery", 1.5, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1500, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Wii", "Electronics", 150, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate-covered almonds", "Candy", 2, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gummy worms", "Candy", 1, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Embossed throw pillow", "Home", 15, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wine glass", "Home", 8, 32);


