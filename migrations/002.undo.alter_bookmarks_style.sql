ALTER TABLE bookmarks
  DROP COLUMN rating;
  
ALTER TABLE bookmarks
  ADD COLUMN
    rating NUMERIC;
