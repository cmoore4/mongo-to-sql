var syntaxes = require('./syntaxes/loader.js');

var module = module || {};

function schemaMaker(config) {

	var me = {};
	me.config = config;
	me.syntaxes = syntaxes;

	me.setSchema = function(schema){
		me.schema = schema;
	};

	me.setSyntax = function(syntaxName){
		me.syntaxName = syntaxName;
		me.sqlSyntax = me.syntaxes[syntaxName];
	};

	me.generateSQL = function(){
		if(typeof me.schema === 'UNDEFINED'){
			me.construct();
		}

		var tables = Object.keys(me.schema.tables);
		var sqlString = '';

		tables.forEach(function(tableName, idx, tablesArr){
			var tableDesc = me.schema['tables'][tableName];
			sqlString += me._combineSQL(
				[me.sqlSyntax.createTable, tableName.toLowerCase() , me.sqlSyntax.columnsOpen, "\n"]
			);

			var columns = Object.keys(tableDesc);
			columns.forEach(function(columnName, colIdx, columnsArr){
				var props = [];
				var column = me.schema['tables'][tableName][columnName];
				props.push('   ');
				props.push(columnName);
				props.push(me.sqlSyntax.types[column.type]);
				if(column.hasOwnProperty('primaryKey')){props.push(me.sqlSyntax.attributes.primaryKey);}
				if(column.hasOwnProperty('notNull')){props.push(me.sqlSyntax.attributes.notNull);}
				if(column.hasOwnProperty('default')){props.push(me._combineSQL([me.sqlSyntax.attributes.default, column.default]));}

				sqlString += me._combineSQL(props);

				if(colIdx != columns.length-1){
					sqlString += me.sqlSyntax.columnEnd + "\n";
				}
			});

			sqlString += me._combineSQL(["\n", me.sqlSyntax.columnsClose, me.sqlSyntax.statementEnd, "\n\n"]);
		});

		return sqlString;
	};

	me._combineSQL = function(strings){
		var sqlString = strings.join(' ')
		return sqlString;
	};

	me.construct = function(){
		if(me.config.hasOwnProperty('schema')){
			me.setSchema(config.schema);
		}

		if(me.config.hasOwnProperty('syntax')){
			me.setSyntax(config.syntax);
		}
	}

	return me;

}


module.exports = schemaMaker;
