const Person = require('../models/peopleModel'); 

exports.getAllPeople = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', q, minAge, maxAge } = req.query;
    const query = {};
    
    if (q) query.name = { $regex: q, $options: 'i' };
    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = Number(minAge);
      if (maxAge) query.age.$lte = Number(maxAge);
    }

    const people = await Person.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const total = await Person.countDocuments(query);

    res.json({
      success: true,
      data: people,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (err) { next(err); }
};

exports.getPerson = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id).lean();
    if (!person) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Person not found' } });
    res.json({ success: true, data: person });
  } catch (err) { next(err); }
};

exports.createPerson = async (req, res, next) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).json({ success: true, data: person });
  } catch (err) { next(err); }
};

exports.updatePerson = async (req, res, next) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    }).lean();
    if (!updated) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Person not found' } });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

exports.deletePerson = async (req, res, next) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Person not found' } });
    res.json({ success: true, message: 'Person deleted successfully' });
  } catch (err) { next(err); }
};