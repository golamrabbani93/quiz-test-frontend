import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
const {Header, Content, Footer, Sider} = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
	(icon, index) => ({
		key: String(index + 1),
		icon: React.createElement(icon),
		label: `nav ${index + 1}`,
	}),
);

const DashboardLayout = () => {
	return (
		<Layout style={{height: '100%'}}>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				style={{height: '100vh', position: 'sticky', top: '0', left: '0'}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="demo-logo-vertical" />
				<div
					style={{
						color: 'white',
						fontSize: '3rem',
						fontWeight: 'bold',
						textAlign: 'center',
						margin: '2rem 0 2rem 0',
					}}
				>
					<Link className="hover:text-primary" to="/">
						BIKEIST
					</Link>
				</div>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
			</Sider>

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
