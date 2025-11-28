const quotesRepo = require('../repositories/quotes.repository');
const calendarIconRepo = require('../repositories/calendarIcon.repository');

async function getQuote(req, res) {
    const randomNumber = req.query.randomNumber;
    const quote = await quotesRepo.findById(randomNumber);

    if (!quote)
        return res.status(404).json({ message: 'Quote not found' });

    res.status(200).json({ content: quote.content });
}

async function getCalendarIcon(req, res) {
    const userId = req.user.id;
    const icons = await calendarIconRepo.findByUser(userId);

    res.status(200).json({ calendar_icon: icons });
}

async function createCalendarIcon(req, res) {
    const userId = req.user.id;
    const { iconNumber, iconDate } = req.body;

    const id = await calendarIconRepo.createIcon({ userId, iconNumber, iconDate });

    if (!id)
        return res.status(500).json({ error: 'Failed insert Calendar Icon' });

    res.status(200).json({ message: 'Success Insert Calendar Icon' });
}

async function patchCalendarIcon(req, res) {
    const userId = req.user.id;
    const { iconId } = req.params;
    const { iconNumber } = req.body;

    await calendarIconRepo.updateIcon({ userId, iconId, iconNumber });

    res.status(200).json({ message: 'Success patch Calendar icon' });
}

async function deleteCalendarIcon(req, res) {
    const userId = req.user.id;
    const { iconId } = req.params;

    await calendarIconRepo.deleteIcon({ userId, iconId });

    res.status(200).json({ message: 'Delete calendar_icon' });
}

module.exports = {
    getQuote,
    getCalendarIcon,
    createCalendarIcon,
    patchCalendarIcon,
    deleteCalendarIcon,
};