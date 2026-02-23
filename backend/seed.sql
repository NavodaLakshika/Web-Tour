-- SAMPLE DATA FOR TALES OF CEYLON
-- Execute this AFTER schema.sql in Supabase SQL Editor

INSERT INTO destinations (name, slug, location, region, interest, image, rating, description, attractions, best_time, price, category)
VALUES 
('Sigiriya', 'sigiriya', 'Matale District', 'Central', 'Cultural', '/images/sigiriya-vibrant.jpg', 4.9, 'Ascend the Lion Rock, an ancient fortress and palace ruin surrounded by extensive gardens and reservoirs.', ARRAY['Lion Rock Fortress', 'Frescoes', 'Mirror Wall'], 'January to April', '$30', 'Historical'),
('Ella', 'ella', 'Hill Country', 'Central', 'Nature', '/images/nine-arch-bridge.jpg', 4.8, 'A small town in the Badulla District of Uva Province, blessed with some of the most beautiful views.', ARRAY['Nine Arch Bridge', 'Little Adam’s Peak', 'Ella Rock'], 'January to March', '$0', 'Mountains');

INSERT INTO experiences (title, category, location, image, price, duration, difficulty, best_time, description, highlights)
VALUES 
('Scenic Kandy to Ella Train', 'Adventure', 'Central Highlands', '/images/train.jpg', '$15', '7 Hours', 'Easy', 'Year-round', 'The world-famous train journey through misty tea plantations.', ARRAY['Demodara Nine Arch Bridge', 'Tea Estate Views']);
