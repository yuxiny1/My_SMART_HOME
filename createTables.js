const util = require('util');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'midterm',
});

const dbRun = util.promisify(db.query.bind(db));

async function createTables() {
    await dbRun(`DROP TABLE IF EXISTS devices;`);
    await dbRun(`DROP TABLE IF EXISTS devicesAdded;`);
    await dbRun(`CREATE TABLE IF NOT EXISTS devices (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name CHAR(30) NOT NULL,
        fields JSON NOT NULL,
        PRIMARY KEY (id));`);
    await dbRun(`CREATE TABLE IF NOT EXISTS devicesAdded (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name CHAR(30) NOT NULL,
        fields JSON NOT NULL,
        PRIMARY KEY (id));`);
    await dbRun(`INSERT INTO devices(name, fields)
        VALUES
        ('airCon_living room', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]'),
        ('Curtain in living room','[{"field_name": "open/close", "field_type": "boolean"}]'),
        ('Curtain in master room','[{"field_name": "open/close", "field_type": "boolean"}]'),
        ('light in corridor','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Lighting in master Room','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Lighting in study Room','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Lighting in master Room','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('TV_85 intch','[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "volume", "field_type": "number"}]'),
        ('TV_65 intch','[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "volume", "field_type": "number"}]'),

        ('home pod in living room ','[{"field_name": "on/off", "field_type": "boolean"}, {"fiel d_name": "volume", "field_type": "number"}]'),
        ('home pod in master room ','[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "volume", "field_type": "number"}]'),
        ('home pod in bathroom ','[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "volume", "field_type": "number"}]'),
        ('THERMOSTAT', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]'),
        ('OVEN', '[{"field_name": "on/off", "field_type": "boolean"}, {"field_name": "temperature", "field_type": "number"}]'),
        ('Toaster','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Kettle','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('camtera1 corridor','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Wine-cellar','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Playstation 5','[{"field_name": "on/off", "field_type": "boolean", "field_name":"volumne", "field_type":"number"}]'),
        ('DeskTop','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Camera','[{"field_name": "on/off", "field_type": "boolean"}]'),

        ('Vacuum-cleaner','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Dryer','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Nintendo-Switch','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Washing-machine','[{"field_name": "on/off", "field_type": "boolean"}]'),
        ('Video-player','[{"field_name": "on/off", "field_type": "boolean"}]');
        `);
}
createTables()
    .then((value) => process.exit(1))
    .catch((error) => console.log(error));
