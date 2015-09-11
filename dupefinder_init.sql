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
-- however js dates automatically get stored as unix timestamps

-- some system vars not stored, like inode, because I see no apparent use in it pertainint to this program
-- atime i.e. last accessed not needed for project
-- ctime i.e. last status change not needed for project
-- it is possible less general data types could optimize the store, but as of yet the more regular ones will suffice
