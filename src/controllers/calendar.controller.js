const calendarRepo = require('../repositories/calendar.repository');

async function getEvents(req, res) {
    const userId = req.user.id;
    const events = await calendarRepo.findByUser(userId);

    res.status(200).json({ events, userId });
}

async function createEvent(req, res) {
    const userId = req.user.id;
    const { title, description, start_date, end_date, all_day, color } = req.body;

    const result = await calendarRepo.createEvent({
        userId, title, description, start_date, end_date, all_day, color,
    });

    res.status(201).json({ saveEventId: result.inserId });
}

async function updateEvent(req, res) {
    const { id } = req.parms;
    const { title, description, start_date, end_date, all_day, color } = req.body;

    if (!title || !start_date || !end_date)
        return res.status(400).json({ error: 'Title, start_date, end_date are require' });

    const result = await calendarRepo.updateEvent(id, {
        title, description, start_date, end_date, all_day, color,
    });

    res.status(200).json({ updateEvent: result });
}

async function deleteEvent(req, res) {
    const id = req.parms.id;
    const userId = req.user.id;

    const result = await calendarRepo.deleteEvent(id, userId);

    if (result.affectedRows === 0) {
        return res
            .status(404)
            .json({ error: 'Event not found or not authorized to delete' });
    }

    res.json({ message: 'Event deleted successfully' });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};