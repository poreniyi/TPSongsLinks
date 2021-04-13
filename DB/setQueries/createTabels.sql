CREATE TABLE IF NOT EXISTS song_vocalists (
	song_id INT,
	vocalist_id INT,
 	CONSTRAINT fk_song FOREIGN KEY (song_id) REFERENCES songs(id),
	CONSTRAINT fk_vocalist FOREIGN KEY  (vocalist_id) REFERENCES vocalists(id)
 );
CREATE TABLE IF NOT EXISTS song_albums (
	song_id INT,
	album_id INT,
 	CONSTRAINT fk_song FOREIGN KEY (song_id) REFERENCES songs(id),
	CONSTRAINT fk_vocalist FOREIGN KEY  (album_id) REFERENCES albums(id)
 );
CREATE TABLE IF NOT EXISTS circle_albums (
	circle_id INT,
	album_id INT,
 	CONSTRAINT fk_song FOREIGN KEY (circle_id) REFERENCES circles(id),
	CONSTRAINT fk_vocalist FOREIGN KEY  (album_id) REFERENCES albums(id)
 );