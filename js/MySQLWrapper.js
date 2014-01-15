var Database = function() {
	// db_name, db_version, db_description, db_size 
	this.db = window.openDatabase( "app", "", "iFixit App", 1024*1024 );
};

Database.prototype.drop = function() {
	this.db.transaction(function(tx) {
		tx.executeSql(
			'DROP TABLE IF EXISTS Devices',
			null,
			function(transaction, result) { console.log(result); },
			function(transaction, error) { console.log(error); }
		);
	});
};

Database.prototype.create = function() {
	this.db.transaction(function(tx) {
		tx.executeSql(
			'CREATE TABLE IF NOT EXISTS Devices ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, thumb TEXT )',
			null,
			function(transaction, result) { console.log(result); },
			function(transaction, error) { console.log(error); }
		);
	});
};
		
Database.prototype.insert = function( name, thumb ) {
	this.db.transaction(function(tx) {
		tx.executeSql(
			'INSERT INTO Devices (id, name, thumb) VALUES (?, ?, ?)',
			[ null, name, thumb ],
			function(transaction, result) { console.log(result); },
			function(transaction, error) { console.log(error); }
		);
	});
};

Database.prototype.select = function( id ) {
	this.db.transaction(function(tx) {
		tx.executeSql(
			'SELECT * FROM Devices WHERE id = ?',
			[ id ],
			function(transaction, results) {
				for( var i = 0; i < results.rows.length; i++ ) {
					var row = results.rows.item(i);
					console.log( row );
				}
			},
			function(transaction, error) { console.log(error); }
		);
	});
};