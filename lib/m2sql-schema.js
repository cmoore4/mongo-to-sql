var syntax = require('./syntaxes/loader.js');

var module = module || {};

var schemaMaker = {

	createSQL: function(jsSchema){
		var tables = Object.keys(jsSchema.tables);

		tables.forEach(function(tableName, idx, tables){
			tableDesc = jsSchema.tables['tableName'];
		});
	}

};


module.exports = schemaMaker;