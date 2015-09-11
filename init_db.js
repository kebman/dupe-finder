var file = 'filetest.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	db.run('CREATE TABLE if not exists "files" '+
		'(md5 TEXT,'+
		'filename TEXT,'+
		'mtime INTEGER,'+
		'btime INTEGER,'+
		'size INTEGER')', function(err) {
		if (err) {
			console.error("Error creating database", err);
		} else {
			console.log("Database successfully created and ready for use!");
		}
	});
});
db.close();
