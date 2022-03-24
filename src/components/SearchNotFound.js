import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        Không có kết quả trả về &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Hãy thử kiểm tra lại thông tin đã nhập!
      </Typography>
    </Paper>
  );
}
