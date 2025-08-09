import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import routesGenerator from '../utils/routesGenerator';
import {adminPath} from './adminRoutes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/admin',
		element: (
			<ProtectedRoute role="admin">
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: routesGenerator(adminPath),
	},
]);

export default router;
