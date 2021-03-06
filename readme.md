#Mongo To SQL Convertor

###A configurable tool to migrate data from a Mongo Database into a SQL Database, and auto-generate a SQL schema along the way.

The goal of this project is to get your schema 95% of the way generated, and then auto-convert and migrate the data.
This project is only a skeleton and does not yet do anything, so you can safely ignore the rest of this readme.

##The Config

###Schema

```json
"schema": {
	"tableName": "objectType",
	"syntax": "sqlite",
	"sparseThreshold": ".4",
	"limit": [
		{
			"value": "2015-01-01",
			"type": "date",
			"condition": "gte",
			"field": "updatedDate"
		}
	]
}
```

M2S(Mongo-To-SQL) will comb through every document in your Mongo database that meets the `limit` criteria.  It will extract all of the unique values for the key specified in `tableName`, and each of those values will be used to generate a SQL table.  For instance, if I have this data set in Mongo:

```js
{id: 1, objectType: "Person", name: "Peter", age: "32", city: "New Orleans", occupation: "Therapist"},
{id: 2, objectType: "Person", name: "Jillian", age: "17", city: "Venice"},
{id: 3, objectType: "Person", name: "Kronk", age: "21", city: "Palo Alto"},
{id: 1, objectType: "Car", model: "Charger", make: "Dodge", year: 2009},
{objectType: "Pet", name: "Fido", age: "6", city: "New Orleans", species: "Iguana"}
```

I would end up with the tables: `Person`, `Car`, and `Pet`.

For each of these objectTypes, M2S will then extract every unique key to use as columns and attempt to infer the best sql data type to use. M2S will also notate in the final schema, via SQL comments, that a specific field is sparsely populated.  It will also auto-generate a primary key(id) if one is not specified.
TODO: Explain data-type inference, reference counting

So, given the same data from above, we would generate these three tables targeting the SQLite syntax:

```sql
CREATE TABLE Person(
	id int auto increment primary key,
	name text,
	age integer,
	city text,
	occupation text --M2S: Sparse .333, Limit .4
);

CREATE TABLE Car(
	id int auto increment primary key,
	model text,
	make text,
	year integer
);

CREATE TABLE Pet(
	id int auto increment primary key, --M2S: Autogenerated
	name text,
	age integer,
	city text,
	species text
);
```