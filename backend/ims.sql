create database ims;
use ims;

	CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    quantity INT DEFAULT 0,
    price DECIMAL(10, 2),
    supplier VARCHAR(100),
    created_at DATETIME DEFAULT GETDATE()
);
select * from products

insert into products(name,category,quantity,price,supplier)
values ('Redmi 5a','Mobile',1,6800,'Amazon'),
('Samsung A30','Mobile',1,18000,'Flipkart'),
('Realme 3i','Mobile',2,85000,'Shopify');
