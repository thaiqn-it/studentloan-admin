import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function BlogPostsSort({ options, onSort }) {
  const [optionChoosen, setOptionChoosen] = useState('DESC')
  return (
    <>
    </>
  );
}
