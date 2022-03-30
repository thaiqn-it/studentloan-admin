import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={googleFill} color="#DF3E30" height={30} />
        </Button>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={phoneFill} color="#1877F2" height={30} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Hoặc
        </Typography>
      </Divider>
    </>
  );
}
