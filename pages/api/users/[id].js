import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
	const { method, body, query } = req;
	switch (method) {
		case 'GET': // get user by id or email
			try {
				console.log(req);
				const user = await User.findOne({ $or: [ { email: query.id }, { id: query.id } ] });
				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		case 'PUT': // edit a user
			try {
				const updated = await User.findOneAndUpdate({ id: body.id }, body);
				res.status(201).json({ success: true, data: updated });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		case 'DELETE': // delete a user
			try {
				const deleted = await User.findOneAndDelete({ id: query.id });
				res.status(201).json({ success: true, data: deleted });
			} catch (error) {
				res.status(400).json({ success: false, data: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
};
