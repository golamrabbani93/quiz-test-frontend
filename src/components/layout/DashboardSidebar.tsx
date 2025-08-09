import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Link} from 'react-router-dom';
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import React from 'react';

const DashboardSidebar = () => {
	const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
		(icon, index) => ({
			key: String(index + 1),
			icon: React.createElement(icon),
			label: `nav ${index + 1}`,
		}),
	);
	return (
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
				className="text-white"
				style={{
					fontSize: '3rem',
					fontWeight: 'bold',
					textAlign: 'center',
					margin: '0 0 2rem 0',
				}}
			>
				<Link to="/">EForgeIT</Link>
			</div>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
		</Sider>
	);
};

export default DashboardSidebar;
