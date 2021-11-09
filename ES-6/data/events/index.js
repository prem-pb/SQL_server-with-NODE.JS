'use strict';

import utils from '../utils.js';
import * as config from '../../config.js';
import sql from 'mssql';
import express from 'express';

const router = express.Router();

export const getEvents = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const eventsList = await pool.request().query(sqlQueries.eventslist);
        return eventsList.recordset;
    } catch (error) {
        console.log(error.message);
    };
};

export const getById = async (eventId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const event = await pool.request()
            .input('eventId', sql.Int, eventId)
            .query(sqlQueries.eventbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    };
};

export const creatEvent = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertEvent = await pool.request()
            .input('eventTitle', sql.NVarChar(100), eventdata.eventTitle)
            .input('eventDescription', sql.NVarChar(1500), eventdata.eventDescription)
            .input('startDate', sql.Date, eventdata.startDate)
            .input('endDate', sql.Date, eventdata.endDate)
            .input('avenue', sql.NVarChar(200), eventdata.avenue)
            .input('maxMembers', sql.Int, eventdata.maxMembers)
            .query(sqlQueries.createEvent);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    };
};

export const updateEvent = async (eventId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
            .input('eventId', sql.Int, eventId)
            .input('eventTitle', sql.NVarChar(100), data.eventTitle)
            .input('eventDescription', sql.NVarChar(1500), data.eventDescription)
            .input('startDate', sql.Date, data.startDate)
            .input('endDate', sql.Date, data.endDate)
            .input('avenue', sql.NVarChar(200), data.avenue)
            .input('maxMembers', sql.Int, data.maxMembers)
            .query(sqlQueries.updateEvent);
        return update.recordset;
    } catch (error) {
        return error.message;
    };
};

export const EventDelete = async (eventId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteEvent = await pool.request()
            .input('eventId', sql.Int, eventId)
            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    };
};

/* export default {
    getEvents,
    getById,
    creatEvent,
    updateEvent,
    deleteEvent
} */
export default router;