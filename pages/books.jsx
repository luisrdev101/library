import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

const bookInitialState = {
	id: '',
	title: '',
	author: '',
	year: '',
	edition: '',
	quantity: ''
};

const BooksPage = () => {
	const [ books, setBooks ] = useState([]);
	const [ book, setBook ] = useState({ ...bookInitialState });
	const [ searchId, setSearchId ] = useState('');
	const fetchAllBooks = async () => {
		try {
			const res = await fetch('/api/books');
			const data = await res.json();
			if (data.success) {
				setBooks(data.data);
			}
		} catch (error) {}
	};
	useEffect(async () => {
		await fetchAllBooks();
	}, []);
	const handleSearchBook = async () => {
		try {
			if (searchId.length === 8) {
				const res = await fetch(`/api/books/${searchId}`);
				const data = await res.json();

				if (data.success) {
					setBook(data.data);
					setSearchId('');
				}
			}
		} catch (error) {}
	};
	const handleSaveBook = async () => {
		try {
			const sendBook = { ...book };
			sendBook.year = Number(sendBook.year);
			sendBook.quantity = Number(sendBook.quantity);
			const res = await fetch(`/api/books`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(sendBook)
			});
			const data = await res.json();
			if (data.success) {
				await fetchAllBooks();
				setBook({ ...bookInitialState });
			}
		} catch (error) {}
	};
	const handleDeleteBook = async () => {
		try {
			const res = await fetch(`/api/books/${book.id}`, {
				method: 'DELETE'
			});
			const data = await res.json();
			if (data.success) {
				await fetchAllBooks();
				setBook({ ...bookInitialState });
			}
		} catch (error) {}
	};
	const handleUpdateBook = async () => {
		try {
			const sendBook = { ...book };
			sendBook.year = Number(sendBook.year);
			sendBook.quantity = Number(sendBook.quantity);
			const res = await fetch(`/api/books/${sendBook.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(sendBook)
			});
			const data = await res.json();
			if (data.success) {
				await fetchAllBooks();
				setBook({ ...bookInitialState });
			}
		} catch (error) {}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBook({ ...book, [name]: value });
	};
	const handleClear = () => {
		setBook({ ...bookInitialState });
	};
	return (
		<Layout>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
				{/** search book */}
				<Card className="col-span-1">
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="search">
							Book id
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="search"
							value={searchId}
							onChange={(e) => setSearchId(e.target.value)}
						/>
					</div>
					<Button onClick={handleSearchBook}>search</Button>
				</Card>
				<Card className="col-span-1 md:col-span-2 row-span-2">
					<p>table of orders</p>
				</Card>
				{/** book information */}
				<Card className="col-span-1">
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="id">
							Id (no editable)
						</label>
						<input
							className="cursor-not-allowed appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="id"
							readOnly
							value={book.id}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="title">
							Title
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="title"
							value={book.title}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="author">
							Author
						</label>
						<input
							className=" appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="author"
							value={book.author}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="year">
							Year
						</label>
						<input
							className=" appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="year"
							value={book.year}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="edition">
							Edition
						</label>
						<input
							className=" appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="edition"
							value={book.edition}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900 mb-1 text-sm " htmlFor="quantity">
							Quantity
						</label>
						<input
							className="appearance-none border rounded w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="quantity"
							value={book.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex justify-around mt-4">
						<button
							onClick={handleSaveBook}
							className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs"
						>
							save
						</button>
						<button
							onClick={handleUpdateBook}
							className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs"
						>
							update
						</button>
						<button
							onClick={handleDeleteBook}
							className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs"
						>
							delete
						</button>
						<button
							onClick={handleClear}
							className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs"
						>
							clear
						</button>
					</div>
				</Card>

				<div className="col-span-1 md:col-span-3 overflow-x-auto border-solid border-gray-200 border rounded">
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
									Title
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Author
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Year
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Edition
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Quantity
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{books.length > 0 &&
								books.map((book) => (
									<tr key={book.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{book.id}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{book.title}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{book.author}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{book.year}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{book.edition}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{book.quantity}
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
};

export default BooksPage;
