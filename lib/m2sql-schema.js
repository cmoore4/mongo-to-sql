var syntax = require('./syntaxes/loader.js');

var module = module || {};

function schemaMaker(config) {

	if(config.hasOwnProperty('schema')){
		schema = schema;
	}

	if(config.hasOwnProperty('syntax')){
		setSyntax(config.syntax);
	}

	this.setSchema = function(schema){
		schema = schema;
	};

	this.setSyntax = function(syntaxName){
		syntaxName = syntaxName;
		sqlSyntax = syntax['syntaxName'];
	};

	this.generateSQL = function(){
		if(!schema){
			return false;
		}

		var tables = Object.keys(jsSchema.tables);
		var sqlString = '';

		tables.forEach(function(tableName, idx, tablesArr){
			var tableDesc = jsSchema.tables['tableName'];
			sqlString += _combineSQL([sqlSyntax.createTable, tableName.toLowerCase() , sqlSyntax.columnsOpen, "\n"]);

			var columns = Object.keys(tableDesc);
			columns.forEach(function(columnName, colIdx, columnsArr){
				var props = [];
				var column = columns['columnName'];
				props.push(columnName);
				props.push(sqlSyntax.types[column.type]);
				if(column.primaryKey){props.push(sqlSyntax.primaryKey);}
				if(column.notNull){props.push(sqlSyntax.notNull);}
				if(column.default){props.push(_combineSql([sqlSyntax.default, column.default]));}

				sqlString += _combineSQL(props);
			});

			sqlString += _combineSQL(["\n", sqlSyntax.columnsClose, "\n\n"]);
		});
	};

	this._combineSQL = function(strings){
		var sqlString = '';
		strings.foreach(function(token, idx, tokens){
			sqlString += token + ' ';
		});
		return sqlString;
	};

}


module.exports = schemaMaker;
