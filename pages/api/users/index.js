import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
	const { method, body, query } = req;

	switch (method) {
		case 'GET': // get all users
			try {
				const users = await User.find({});
				res.status(200).json({ success: true, data: users });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		case 'POST': // add a new user
			try {
				const saved = await User.create(body);
				res.status(200).json({ success: true, data: saved });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};
