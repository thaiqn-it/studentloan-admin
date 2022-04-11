import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import moment from 'moment';
import { notificationApi } from '../../apis/notificationApi';
import { NOTIFICATION_TYPE } from '../../constants/enum/index';

// ----------------------------------------------------------------------



export default function NotificationsPopover() {
  const navigate = useNavigate()
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0)

  const setRead = (notification) =>{
    notificationApi.update(notification.id,{...notification,isRead:true})
  }

  const renderContent = (notification)=> {
    const description = (
      <Typography variant="subtitle2">
        {notification.title}
        <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp; {noCase(notification.description)}
        </Typography>
      </Typography>
    );
  
    if (notification.type === NOTIFICATION_TYPE.USER) {
      return {
        icon: <img alt={notification.description} src="/static/icons/ic_user_noti.svg" />,
        description: description
      };
    }
    if (notification.type === NOTIFICATION_TYPE.LOAN) {
      return {
        icon: <img alt={notification.description} src="/static/icons/ic_loan_noti.svg" />,
        description: description
      };
    }
  }
  const NotificationItem = ({ notification }) => {
    const { icon, description: description } = renderContent(notification);
  
    return (
      <ListItemButton
        onClick={() => {
          navigate(notification.redirectUrl)
          setRead(notification)
          setOnClickItem(moment().format())
          handleClose()
        }}
        disableGutters
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(!notification.isRead && {
            bgcolor: '#D2F9EB'
          })
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral', padding: 0.75 }}>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={description}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled'
              }}
            >
              <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
              {formatDistanceToNow(
                new Date(notification.createdAt),
                {locale:vi}
                )}
            </Typography>
          }
        />
      </ListItemButton>
    );
  }

  const [onClickItem,setOnClickItem] = useState(moment().format())

  useEffect(() => {
    const fetchData = async () => {
      const resNoti = await notificationApi.getTop5TodayByUserId({ startDate: moment().startOf('D').format(), endDate: moment().endOf('D').format() })
      const resTotalUnread = await notificationApi.getAllByUserId();
      setNotifications(resNoti.data)
      setTotalUnread(resTotalUnread.data.countNotRead)
    }
    fetchData()
  }, [onClickItem])


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnread} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Thông báo</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Bạn có {totalUnread} tin chưa xem
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', color: 'primary.main' }}>
                5 tin mới nhất hôm nay
              </ListSubheader>
            }
          >
            {notifications.length > 0 ? notifications?.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            )) : (<>
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', color: 'red' }}>
                Không có thông báo mới nào trong hôm nay
              </ListSubheader>
            </>)}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth onClick={(e) => {
            e.preventDefault()
            navigate('/dashboard/viewallnoti')
            handleClose()
          }}>
            Xem tất cả
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
