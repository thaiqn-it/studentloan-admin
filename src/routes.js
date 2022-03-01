import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Profile from './pages/Profile';
import WaitingPost from './pages/WaitingPost';
import User from './pages/User';
import NotFound from './pages/Page404';
import ManageSchool from './pages/ManageSchool';
import ViewTransactions from './pages/ViewTransactions';
import DetailSchool from './pages/DetailSchool';
import ViewPost from './pages/ViewPost';
import ViewListContract from './pages/ViewListContract';
import CreateSchool from './pages/CreateSchool';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'waitingpost', element: <WaitingPost /> },
        { path: 'manageschool', element: <ManageSchool /> },
        { path: 'viewlistcontract', element: <ViewListContract /> },
        { path: 'viewtransactions', element: <ViewTransactions /> },
        { path: 'viewPost', element: <ViewPost /> },
        { path: 'detailschool/:id', element: <DetailSchool /> },
        { path: 'createschool', element: <CreateSchool /> },
        { path: 'profile', element: <Profile /> },
        { path: '', element: <DashboardApp /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
