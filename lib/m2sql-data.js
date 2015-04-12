var module = module || {};

var mongoData = function(opts){

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

module.exports = mongoData();
