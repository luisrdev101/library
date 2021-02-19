import Book from '../../../models/Book';
import dbConnect from '../../../utils/dbConnect';
import { nanoid } from 'nanoid';

dbConnect();

export default async (req, res) => {
	const { method, body } = req;
	switch (method) {
		case 'GET': // get all books
			try {
				const books = await Book.find({});
				res.status(200).json({ success: true, data: books });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST': // add a new book
			try {
				const newBook = { ...body, id: nanoid(8) };
				const book = await Book.create(newBook);
				res.status(201).json({ success: true, data: book });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};
