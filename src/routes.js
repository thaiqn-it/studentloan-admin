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
import DetailStudent from './pages/DetailStudent';
import DetailInvestor from './pages/DetailInvestor';
import Systemconfig from './pages/SystemConfig';
import ContractPage from './pages/ContractPage';
import { LOAN_STATUS } from './constants/enum';

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
        { path: 'student/:id', element: <DetailStudent /> },
        { path: 'investor/:id', element: <DetailInvestor /> },
        { path: 'waitingpost', element: <WaitingPost initalType={LOAN_STATUS.WAITING} orderByLastest='DESC' initalLimit={8} initalOffset={0} /> },
        { path: 'manageschool', element: <ManageSchool /> },
        { path: 'viewlistcontract', element: <ViewListContract /> },
        { path: 'viewtransactions', element: <ViewTransactions /> },
        { path: 'viewPost/:id', element: <ViewPost /> },
        { path: 'detailschool/:id', element: <DetailSchool /> },
        { path: 'createschool', element: <CreateSchool /> },
        { path: 'profile', element: <Profile /> },
        { path: 'systemconfig', element: <Systemconfig /> },
        { path: 'contract', element: <ContractPage /> },
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
