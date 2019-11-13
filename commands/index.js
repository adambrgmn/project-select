import React from 'react';
import PropTypes from 'prop-types';

import { Entry } from '../src/Entry';

/// List all available projects or open a specified
const EntryCommand = ({ inputArgs }) => {
  const [project] = inputArgs;
  return <Entry project={project} />;
};

EntryCommand.propTypes = {
  /// Project to search for and open
  inputArgs: PropTypes.array,
};

export default EntryCommand;
