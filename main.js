var mysql = require('mysql');
var config = require('./config.json');
var util = require('util')

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
    let result;

    if (action === 'GET') {
        if ('event_id' in e.body) {
            data = await getOneEvent(e.body.event_id);
            data = data[0];

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

    result = {
        status: 200,
        message: 'success',
        data: data
    };

    return result;
};

const getAllEvents = () => {
    return pool.query('select * from events;');
};

const getOneEvent = async (id) => {
    let result = await pool.query(`select * from events where event_id = ${id};`);
    return result;
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
        return { errorMessage: "Unprocessed." };
    }
    return result;
};
const updateEvent = async (params) => {
    const { event_id, organizer, venue, date } = params;
    let result = await pool.query(`update events organizer = ${organizer}, ${venue}, ${date}  $ in events where event_id = ${event_id};`);
    let updatedEvent = await getOneEvent(result.insertId);
    return updatedEvent;
};