import Admin from '../pages/Dashboard/Admin/Admin';
import AllUser from '../pages/Dashboard/Admin/AllUser/AllUser';

export const adminPath = [
	{
		name: 'Dashboard',
		path: 'dashboard',
		element: <Admin />,
	},
	{
		name: 'User Management',
		children: [
			{
				name: 'User List',
				path: 'user-list',
				element: <AllUser />,
			},
		],
	},
];
