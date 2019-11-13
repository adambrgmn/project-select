import * as fs from 'fs';
import { promisify } from 'util';
import { basename, join } from 'path';
import { config } from './config';
import { Project, ProjectRoot } from './types';

const readDir = promisify(fs.readdir);

export const getProjects = async (): Promise<Project[]> => {
  const projectRoots: ProjectRoot[] = [
    ...config.get('roots'),
    { path: join(process.env.HOME || '~', 'Development'), name: 'Development' },
  ];
  const projects: Project[] = [];

  for (const projectRoot of projectRoots) {
    const paths = await readDir(projectRoot.path);
    projects.push(
      ...paths.map((path: string): Project => ({ path, name: basename(path) })),
    );
  }

  return projects;
};
