import Card from '../components/Card';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

const userInitialState = {
	id: '',
	name: '',
	email: ''
};

const Users = () => {
	const [ searchId, setSearchId ] = useState('');
	const [ user, setUser ] = useState({ ...userInitialState });
	const [ users, setUsers ] = useState([]);
	const handleSearchUser = async () => {
		try {
			const res = await fetch(`/api/users/${searchId}`);
			const data = await res.json();
			if (data.success) {
				const { id, name, email } = data.data;
				setUser({ id, name, email });
				setSearchId('');
			}
		} catch (error) {}
	};
	useEffect(async () => {
		try {
			const res = await fetch(`/api/users`);
			const data = await res.json();
			if (data.success) {
				setUsers(data.data);
			}
		} catch (error) {}
	}, []);
	return (
		<Layout>
			<div className="grid grid-cols-3 gap-4 my-4">
				<Card className="col-span-1">
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="search">
							User id or email
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="search"
							value={searchId}
							onChange={(e) => setSearchId(e.target.value)}
						/>
					</div>
					<Button onClick={handleSearchUser}>search</Button>
				</Card>
				<div className="col-span-1 md:col-span-2 row-span-2 overflow-y-auto max-h-96 overflow-x-auto border-solid border-gray-200 border rounded">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Id
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Email
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{users.length > 0 &&
								users.map((user) => (
									<tr key={user.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{user.id}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{user.name}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{user.email}
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<Card className="col-span-1">
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="id">
							id
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="quantity"
							readOnly
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="id">
							name
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="quantity"
							readOnly
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="id">
							email
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="quantity"
							readOnly
						/>
					</div>
					<div className="flex justify-around mt-4">
						<button className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs">
							save
						</button>
						<button className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs">
							update
						</button>
						<button className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs">
							delete
						</button>
						<button className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs">
							clear
						</button>
					</div>
				</Card>
			</div>
		</Layout>
	);
};

export default Users;
