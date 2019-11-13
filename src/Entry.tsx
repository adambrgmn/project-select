import React from 'react';
import { Box } from 'ink';
import { usePromise, AsyncState } from '@fransvilhelm/hooks';
import { getProjects } from './projects';
import { Project } from './types';

interface Props {
  project?: string;
}

export const Entry: React.FC<Props> = ({ project }) => {
  const [state, projects] = usePromise(getProjects, []);

  switch (state) {
    case AsyncState.initial:
    case AsyncState.pending:
      return <Box>Loading</Box>;

    case AsyncState.rejected:
      return <Box>An error occurred</Box>;

    case AsyncState.fullfilled:
      return (
        <Box flexDirection="column" width="100%">
          {(projects as Project[]).map(project => (
            <Box key={project.path}>{project.name}</Box>
          ))}
        </Box>
      );
  }
};
