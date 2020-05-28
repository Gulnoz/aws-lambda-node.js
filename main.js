var mysql = require('mysql');
var config = require('./config.json');
var util = require('util');

var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
});

pool.query = util.promisify(pool.query);

exports.handler = async (e) => {
    let action = e.httpRequest;
    let data = [];

    if (action === 'GET') {
        if ("event_id" in e.body) {
            data = await getOneEvent(e.body.event_id);
        }
        else {
            data = await getAllEvents();
        }
    }
    else if (action === 'POST') {
        data = await createEvent(e.body);
    }
    else if (action === 'PUT') {
        data = await updateEvent(e.body);
    }
    else if (action === 'DELETE') {
        data = await deleteEvent(e.body.event_id);
    }

    return data;
};

const getAllEvents = () => {
    return pool.query('select * from events;');
};

const getOneEvent = async (id) => {
    let result = await pool.query(`select * from events where event_id = ${id};`);
    if (result.length > 0) {
        return result[0]
    }
    return { 'errorMessage': `id: '${id}' was not found.` };
};

const createEvent = async (params) => {
    const { organizer, venue, date } = params;
    let result = await pool.query(`insert into events (organizer, venue, date) values ("${organizer}", "${venue}", "${date}");`);
    let createdEvent = getOneEvent(result.insertId);
    return createdEvent;
};

const deleteEvent = async (id) => {
    let result = await pool.query(`delete from events where event_id = ${id};`);
    if (result.affectedRows === 0) {
        return { "errorMessage": `id: '${id}' was not found.` };
    }
    return { "message": `Event with id: '${id}' successfully was deleted.` };
};
const updateEvent = async (params) => {
    const { event_id, organizer, venue, date } = params;
    await pool.query(`update events set organizer = "${organizer}", venue = "${venue}", date = "${date}" where event_id = ${event_id};`);
    let updatedEvent = getOneEvent(event_id);
    return updatedEvent;
};