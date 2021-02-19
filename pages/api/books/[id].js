import Book from '../../../models/Book';
import dbConnect from '../../../utils/dbConnect';
import { nanoid } from 'nanoid';

dbConnect();

export default async (req, res) => {
	const { method, body, query } = req;
	switch (method) {
		case 'GET': // get book by id
			try {
				const book = await Book.findOne({ id: query.id });
				res.status(200).json({ success: true, data: book });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		case 'POST': // add a new book
			try {
				const book = await Book.create({ id: nanoid(8), ...body });
				res.status(201).json({ success: true, data: book });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		case 'PUT': // edit a book
			try {
				const updated = await Book.findOneAndUpdate({ id: body.id }, body);
				res.status(201).json({ success: true, data: updated });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		case 'DELETE': // delet a book
			try {
				const deleted = await Book.findOneAndDelete({ id: query.id });
				res.status(201).json({ success: true, data: deleted });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};
