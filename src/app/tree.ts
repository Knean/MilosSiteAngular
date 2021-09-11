import { Node } from './node';
import { User } from './user';

export interface Tree {
  nodes: Node[]
  blobs: any[]
  users: User[]
}
