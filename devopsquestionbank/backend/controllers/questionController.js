const Question = require('../models/Question');

exports.getAllQuestions = async (req, res) => {
    try {
        const { category, difficulty, company, q } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        if (company) filter.company = { $regex: company, $options: 'i' };

        if (q) {
            filter.$or = [
                { question: { $regex: q, $options: 'i' } },
                { answer: { $regex: q, $options: 'i' } },
                { company: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } }
            ];
        }

        const questions = await Question.find(filter).sort({ createdAt: -1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestionsByCategory = async (req, res) => {
    try {
        const questions = await Question.find({ category: req.params.category });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
