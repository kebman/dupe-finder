var file = 'filetest.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	db.run('CREATE TABLE if not exists "files" '+
		'(id INTEGER PRIMARY KEY AUTOINCREMENT,'+
		'filename TEXT,'+
		'md5 TEXT,'+
		'size INTEGER,'+
		'mtime TEXT,'+
		'btime TEXT)', function(err) {
		if (err) {
			console.error("Error creating database", err);
		} else {
			console.log("Database successfully created and ready for use!");
		}
	});
});
db.close();
