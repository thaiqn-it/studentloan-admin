import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { loadToken } from '../../apis';
import { userApi } from '../../apis/user';
import { logOut } from '../../context/AdminAction'


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Trang chính',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Hồ sơ',
    icon: personFill,
    linkTo: '../dashboard/profile'
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        loadToken()
        const resData = await userApi.getAdminInfo()
        setAdmin(resData.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault()
    logOut()
    navigate('/login')    
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={admin.profileUrl} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {admin.fristName} {admin.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {admin.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {admin.phoneNumber}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={handleLogout} fullWidth color="inherit" variant="outlined">
            Đăng xuất
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
