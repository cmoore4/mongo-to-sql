var syntax = require('./syntaxes/loader.js');

var module = module || {};

function schemaMaker(config) {

	if(config.hasOwnProperty('schema')){
		schema = schema;
	}

	if(config.hasOwnProperty('syntax')){
		syntax = syntax;
	}

	this.setSchema = function(schema){
		schema = schema;
	}

	this.setSyntax = function(syntax){
		syntax = syntax;
	}

	this.generateSQL = function(){
		if(!schema){
			return false;
		}

		var tables = Object.keys(jsSchema.tables);

		tables.forEach(function(tableName, idx, tables){
			tableDesc = jsSchema.tables['tableName'];
		});
	};

}


module.exports = schemaMaker;
