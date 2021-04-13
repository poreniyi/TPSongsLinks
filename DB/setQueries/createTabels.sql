---One to many
CREATE TABLE IF NOT EXISTS SONGS (
	id SERIAL PRIMARY KEY,
    Name TEXT UNIQUE,
	Hash TEXT UNIQUE,
    Length float(5),
	ImgFormat TEXT,
	imgData bytea,
	BPM float(5),
    Year SMALLINT,
	album_id INT,
	CONSTRAINT fk_album FOREIGN KEY  (album_id) REFERENCES albums(id)
 );
 ----Many to many
CREATE TABLE IF NOT EXISTS song_vocalists (
	song_id INT,
	vocalist_id INT,
 	CONSTRAINT fk_song FOREIGN KEY (song_id) REFERENCES songs(id),
	CONSTRAINT fk_vocalist FOREIGN KEY  (vocalist_id) REFERENCES vocalists(id)
 );
CREATE TABLE IF NOT EXISTS song_arrangers (
	song_id INT,
	arranger_id INT,
 	CONSTRAINT fk_song FOREIGN KEY (song_id) REFERENCES songs(id),
	CONSTRAINT fk_arranger FOREIGN KEY  (arranger_id) REFERENCES arrangers(id)
 );

CREATE TABLE IF NOT EXISTS circle_albums (
	circle_id INT,
	album_id INT,
 	CONSTRAINT fk_circle FOREIGN KEY (circle_id) REFERENCES circles(id),
	CONSTRAINT fk_album FOREIGN KEY  (album_id) REFERENCES albums(id)
 );
 CREATE TABLE IF NOT EXISTS circle_arrangers (
	circle_id INT,
	arranger_id INT,
 	CONSTRAINT fk_circle FOREIGN KEY (circle_id) REFERENCES circles(id),
	CONSTRAINT fk_vocalist FOREIGN KEY  (arranger_id) REFERENCES arrangers(id)
 );
 
  CREATE TABLE IF NOT EXISTS circle_songs (
	circle_id INT,
	song_id INT,
 	CONSTRAINT fk_circle FOREIGN KEY (circle_id) REFERENCES circles(id),
	CONSTRAINT fk_song FOREIGN KEY  (song_id) REFERENCES songs(id)
 );