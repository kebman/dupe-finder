CREATE TABLE if not exists "files" (
	md5 TEXT,
	filename TEXT,
	mtime INTEGER,
	btime INTEGER,
	size INTEGER
);

-- note: no ID field needed as md5 hash is sufficient for indexing and easy comparison

-- note: SQLite3 has no date type, though it has functions to handle date strings
-- in this project, dates will be handled by Node.js
-- however js dates automatically get stored as unix timestamps so no worries ^^

-- some system vars not stored, like inode, because I see no apparent use in it pertainint to this program
-- atime i.e. last accessed not needed for project
-- ctime i.e. last status change not needed for project
-- it is possible that less general data types could optimize the store, but as of yet the more regular ones will suffice


-- new iteration to check for non-unique duplicates and log out dupes by checking for insert errors from sqlite3

CREATE TABLE if not exists "files" (
	md5 TEXT PRIMARY KEY,
	filename TEXT,
	mtime INTEGER,
	btime INTEGER,
	size INTEGER
);


-- could be good with a table that saves file paths, however that would mean that the files table need another field to store references to it

CREATE TABLE if not exists "files" (
	md5 TEXT,
	filename TEXT,
	mtime INTEGER,
	btime INTEGER,
	size INTEGER,
	pathid INTEGER REFERENCES paths(id)
);

CREATE TABLE if not exists "paths" (
	id INTEGER PRIMARY KEY,
	filepath TEXT
);

-- this setup would essentially only store two entries in the paths table; i.e. that of path A and path B
-- but naturally it would save a ton of space, considering the amount of files that can hide in a folder...
