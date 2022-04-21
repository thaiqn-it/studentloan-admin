import { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
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
import {useAuthState} from '../src/context/AuthContext'
import ViewAllNoti from './pages/ViewAllNoti';
import ManageMajor from './pages/ManageMajor';

// ----------------------------------------------------------------------

const routes = (admin) => [
  {
    path: '/dashboard',
    element: admin?<DashboardLayout />:<Navigate to='../login'/>,
    children: [
      { element: <Navigate to="/dashboard/app" replace /> },
      { path: 'app', element: <DashboardApp /> },
      { path: 'user', element: <User /> },
      { path: 'student/:id', element: <DetailStudent /> },
      { path: 'investor/:id', element: <DetailInvestor /> },
      { path: 'posts', element: <Posts initalType={LOAN_STATUS.WAITING} orderByLastest='DESC' initalLimit={8} initalOffset={0} /> },
      { path: 'manageschool', element: <ManageSchool /> },
      { path: 'managemajor', element: <ManageMajor /> },
      { path: 'viewlistcontract', element: <ViewListContract /> },
      { path: 'viewtransactions', element: <ViewTransactions /> },
      { path: 'viewPost/:id', element: <ViewPost /> },
      { path: 'detailschool/:id', element: <DetailSchool /> },
      { path: 'createschool', element: <CreateSchool /> },
      { path: 'profile', element: <Profile /> },
      { path: 'systemconfig', element: <Systemconfig /> },
      { path: 'contract', element: <ContractPage /> },
      { path: 'viewallnoti', element: <ViewAllNoti /> },
      { path: '', element: <DashboardApp /> },
    ]
  },
  {
    path: '/',
    element: admin?<LogoOnlyLayout />:<Navigate to ='./login' replace/>,
    children: [
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
    ]
  },
  { path: '/login', element: admin?<Navigate to ='../dashboard' replace/> :<Login/> },
  { path: '', element: admin?<Navigate to ='../dashboard' replace/> :<Login/> },
]

export default function Router() {
  const context = useAuthState()
  const admin = context.admin
  return useRoutes(routes(admin));
}
