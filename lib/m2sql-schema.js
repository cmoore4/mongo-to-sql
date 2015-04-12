var syntaxes = require('./syntaxes/loader.js');
var module = module || {};

function jsToSQL(config) {

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

		tables.forEach(function(tableName, idx){
			var tableDesc = me.schema['tables'][tableName];
			sqlString += me._combineSQL(
				[me.sqlSyntax.createTable, tableName.toLowerCase() , me.sqlSyntax.columnsOpen, "\n"]
			);

			var columns = Object.keys(tableDesc);
			columns.forEach(function(columnName, colIdx){
				var props = [];
				var column = me.schema['tables'][tableName][columnName];

				props.push('   ');
				props.push(columnName);
				props.push(me.sqlSyntax.types[column.type]);

				props.push(me._setAttributes(column));

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
		return strings.join(' ')
	};

	me._setAttributes = function(column){
		var colAttributes = [];
		var allAttributes = Object.keys(me.sqlSyntax.attributes);

		allAttributes.forEach(function(attributeName, idx){
			if(column.hasOwnProperty(attributeName)) {
				if(attributeName == 'default'){
					colAttributes.push(me._combineSQL([me.sqlSyntax.attributes[attributeName], column[attributeName]]));
				} else {
					colAttributes.push(me.sqlSyntax.attributes[attributeName]);
				}
			}
		});
		return colAttributes;
	};

	me.construct = function(){
		if(me.config.hasOwnProperty('schema')){
			me.setSchema(config.schema);
		}

		if(me.config.hasOwnProperty('syntax')){
			me.setSyntax(config.syntax);
		}
	};

	return me;

}


var mongoToJS = function(opts){

	var me = {};
	me.opts = opts;

	me.tables = {};
	me.tableNames = [];


	me.setMongoConn = function (conn){
		me.mongoConn = conn;
	};

	me.getTables = function(){
		me.tableNames = conn.distinct(me.opts.data.tableKey);
	};

	if(opts.hasOwnProperty('mongoConn')){
		me.setMongoConn(opts.mongoConn);
	}

	return me;
}

module.exports = {
	mongoToJS: mongoToJS,
	jsToSQL: jsToSQL
};
