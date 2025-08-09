import Student from '../pages/Dashboard/Student/Student';

export const studentPath = [
	{
		name: 'Dashboard',
		path: 'dashboard',
		element: <Student />,
	},
	{
		name: 'User Management',
		children: [
			{
				name: 'User List',
				path: 'user-list',
				element: <>user</>,
			},
		],
	},
];
