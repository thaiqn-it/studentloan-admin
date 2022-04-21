import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import settingsFill from '@iconify/icons-eva/settings-fill';
import bellFill from '@iconify/icons-eva/bell-fill';
import schoolFill from '@iconify/icons-ion/school';
import fileFill from '@iconify/icons-eva/file-text-fill'
import bookFill from '@iconify/icons-eva/book-fill'

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
    title: 'quản lý các hồ sơ vay',
    path: '/dashboard/posts',
    icon: getIcon(fileFill)
  },
  {
    title: 'quản lý trường đại học',
    path: '/dashboard/manageschool',
    icon: getIcon(schoolFill)
  },
  {
    title: 'quản lý ngành học',
    path: '/dashboard/managemajor',
    icon: getIcon(bookFill)
  },
  {
    title: 'Thông báo',
    path: '/dashboard/viewallnoti',
    icon: getIcon(bellFill)
  },
  {
    title: 'thiết lập',
    path: '/dashboard/systemconfig',
    icon: getIcon(settingsFill)
  },
];

export default sidebarConfig;
