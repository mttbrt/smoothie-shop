MERGE INTO tbl_user (id, username, password, authority) VALUES
(1, 'owner', '$2a$10$EKlRvIQfTMkVzTG1bYQm3.5cfvKLtkBw7RhMpxuyRCiF5HubRlsDq', 'ROLE_OWNER'),
(2, 'user', '$2a$10$EKlRvIQfTMkVzTG1bYQm3.5cfvKLtkBw7RhMpxuyRCiF5HubRlsDq', 'ROLE_USER');

MERGE INTO tbl_smoothie (id, name, price) VALUES
(1, 'Strawberry Galaxy', 3.99),
(2, 'Banana Oasis', 2.49),
(3, 'Biscuit Wave', 1.05),
(4, 'Choco Drink', 0.98);

MERGE INTO tbl_nutrient (id, name, unit) VALUES
(1, 'Calories', 'Kcal'),
(2, 'Carbs', 'g'),
(3, 'Proteins', 'g');

MERGE INTO tbl_smoothie_nutrient (id, smoothie_id, nutrient_id, amount) VALUES
(1, 1, 1, 100),
(2, 1, 2, 10.5),
(3, 1, 3, 5.6),
(4, 2, 1, 200),
(5, 2, 2, 13.5),
(6, 2, 3, 7.6),
(7, 3, 1, 300),
(8, 3, 2, 15.5),
(9, 3, 3, 7.0),
(10, 4, 1, 550),
(11, 4, 2, 13.5),
(12, 4, 3, 4.0);