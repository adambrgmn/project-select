import Conf from 'conf';
import { ProjectRoot } from './types';

interface Store {
  roots: ProjectRoot[];
}

const defaults: Store = {
  roots: [],
};

const config = new Conf<Store>({ defaults });

export { config };
