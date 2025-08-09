import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../redux/hooks';
import {getCurrentUser} from '../../redux/features/auth/authSlice';
import sidebarGenerator from '../../utils/sidebarGenerator';
import {adminPath} from '../../routes/adminRoutes';
import {studentPath} from '../../routes/studentRoutes';
import type {MenuItemType} from '../../types/route';
const userRole = {
	ADMIN: 'admin',
	SUPERVISOR: 'supervisor',
	STUDENT: 'student',
};
const DashboardSidebar = () => {
	const user = useAppSelector(getCurrentUser);

	let sidebarItems;
	switch (user!.role) {
		// case userRole.SUPERVISOR:
		// 	sidebarItems = sidebarGenerator(supervisorPaths, userRole.SUPERVISOR);
		// 	break;
		case userRole.ADMIN:
			sidebarItems = sidebarGenerator(adminPath, userRole.ADMIN);
			break;
		case userRole.STUDENT:
			sidebarItems = sidebarGenerator(studentPath, userRole.STUDENT);
			break;

		default:
			break;
	}
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
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['4']}
				items={sidebarItems as MenuItemType[]}
			/>
		</Sider>
	);
};

export default DashboardSidebar;
