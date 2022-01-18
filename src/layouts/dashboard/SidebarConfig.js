import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import clockOutline from '@iconify/icons-eva/clock-fill';
import fileContract from '@iconify/icons-fa-solid/file-contract';
import schoolFill from '@iconify/icons-ion/school';
import transactionFill from '@iconify/icons-ant-design/transaction-outlined';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'bảng phân tích',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'quản lý người dùng',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'các bài đang chờ duyệt',
    path: '/dashboard/waitingpost',
    icon: getIcon(clockOutline)
  },
    {
    title: 'các giao dịch',
    path: '/dashboard/viewtransactions',
    icon: getIcon(transactionFill)
  },
  {
    title: 'quản lý trường đại học',
    path: '/dashboard/manageschool',
    icon: getIcon(schoolFill)
  },
  {
    title: 'quản lý hợp đồng',
    path: '/dashboard/viewlistcontract',
    icon: getIcon(fileContract)
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
