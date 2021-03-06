var module = module || {};

var sqlite = {

	createTable: 'CREATE TABLE',
	columnsOpen: '(',
	columnsClose: ')',
	columnEnd: ',',
	statementEnd: ';',

	types: {

		bool: 'integer',
		'int': 'integer',
		'float': 'real',
		varchar: 'text',
		text: 'text',
		blob: 'blob',
		date: 'text',
		datetime: 'text',
		time: 'text',
		epoch: 'integer'

	},

	attributes: {

		'null': 'null',
		notNull: 'not null',
		primaryKey: 'primary key',
		'default': 'default'

	}
};

module.exports = sqlite;
