import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

const SearchPosts = props => (
  <FormGroup>
    <FormControl type="text" placeholder="Filter..." onChange={props.onChange} />
  </FormGroup>
);

SearchPosts.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SearchPosts;

