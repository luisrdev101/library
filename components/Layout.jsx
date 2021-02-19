import Link from 'next/link';

const Layout = ({ children }) => {
	return (
		<div className="container mx-auto">
			<div className="flex justify-center flex-wrap md:justify-between items-center border rounded px-4 mt-4 border-gray-200 border-solid">
				<div className="w-full md:w-auto">
					<Link href="/">
						<a>
							<h1 className="text-center md:text-left text-lg my-4">
								Library Managment
							</h1>
						</a>
					</Link>
				</div>
				<nav>
					<Link href="/books">
						<a className="py-4 mx-4 md:mr-0 md:ml-8">Books</a>
					</Link>

					<Link href="/users">
						<a className="py-4 mx-4 md:mr-0 md:ml-8">Users</a>
					</Link>

					<Link href="/orders">
						<a className="py-4 mx-4 md:mr-0 md:ml-8">Orders</a>
					</Link>
				</nav>
			</div>
			{children}
		</div>
	);
};

export default Layout;
