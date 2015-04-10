var config = require('./config.json'),
	util = require('util'),
	debuglog = util.debuglog('main'),
	argv = require('minimist')(process.argv.slice(2)),
	//mongoLib = require('mongodb').MongoClient,
	schemaParser = require('./lib/m2sql-schema.js'),
	dataParser = require('./lib/m2sql-data.js'),
	mongoConn;

var debug = function(obj){
	debuglog(util.inspect(obj, {depth: 3, colors: true}));
};
debug(config);

/*mongoLib.connect(config.connection.host, function(err, db){
	if(err){ return console.log('Could not connect to Mongo'); }
	mongoConn = db;
	run();
});*/

function run(){
	switch(argv['_'][0]){
		case 'data':
			return convertData();
		case 'schema':
			return createSchema();
		default:
			return new Error("Must use argument 'data' or 'schema'");
	}
}

function convertData(){

}

function createSchema(){
	var schema = {
		'tables':{
			'test': {
				'id': {
					'primaryKey': true,
					'type': 'int'
				},
				'col1':{
					'type': 'int',
					'sparse': true,
					'default': 17
				},
				'col2': {
					'type': 'bool',
					notNull: true
				}
			},
			'test2': {
				'id_pk': {
					'primaryKey': true,
					'type': 'int',
					'notNull': true
				},
				'col3':{
					'type': 'int',
					'sparse': true,
					'default': 18
				},
				'col4': {
					'type': 'text',
					'notNull': true
				}
			}
		}
	};

	var schemaMaker = schemaParser({schema: schema, syntax: config.schema.syntax});
	schemaMaker.construct();

	var sqlSchema = schemaMaker.generateSQL();

	return sqlSchema;
}

console.log(run());