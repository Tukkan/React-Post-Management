import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const SearchPosts = props => (
  <FormGroup>
    <FormControl type="text" placeholder="Filter..." onChange={props.onChange} />
  </FormGroup>
);

export default SearchPosts;