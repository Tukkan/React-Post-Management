import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import './LoadError.scss';

const LoadError = props => (
  <Alert bsStyle="danger">
    <h4>Unable to load the data</h4>
    <p>There was a problem with downloadign the data from the server. Please contact the administrator.</p>
    <p>
      <Button bsStyle="danger" onClick={props.callback}>Try again</Button>
    </p>
  </Alert>
);

LoadError.propTypes = {
  callback: PropTypes.func.isRequired
};

export default LoadError;

