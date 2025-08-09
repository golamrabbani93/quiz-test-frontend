import {Layout} from 'antd';

import {Link, Outlet} from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
const {Header, Content, Footer} = Layout;

const DashboardLayout = () => {
	return (
		<Layout style={{height: '100%'}}>
			<DashboardSidebar />

			<Layout>
				<Header style={{padding: '0 auto'}}>
					<nav className="w-[20%]">
						<ul className="flex justify-between items-center max-w-4xl mx-auto">
							{/* Home */}
							<Link
								to={'/'}
								className=" text-white flex items-center space-x-2 cursor-pointer hover:text-primary transition font-bold"
							>
								{/* <FaHome className="text-xl" /> */}
								<span>Home</span>
							</Link>

							{/* Logout */}
							<li
								// onClick={handleLogout}
								className="text-white flex items-center space-x-2 cursor-pointer hover:text-primary transition font-bold"
							>
								{/* <FaSignOutAlt className="text-xl" /> */}
								<span>Logout</span>
							</li>
						</ul>
					</nav>
				</Header>
				<Content>
					<div
						style={{
							minHeight: 340,
							padding: 0,
						}}
					>
						<Outlet />
					</div>
				</Content>
				<Footer style={{textAlign: 'center'}} className="bg-[#001529]">
					<h2 className=" text-white uppercase text-sm">
						© {new Date().getFullYear()} Bikeist. Made by{' '}
						<Link to={`https://webrabbani.web.app/`} className="text-primary">
							Golam rabbani
						</Link>
					</h2>
				</Footer>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
