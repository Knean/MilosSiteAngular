export interface Node {
  number:          number;
  userName:        string;
  child1:          number;
  child1Value:     number;
  child2:          number;
  child2Value:     number;
  childrenMissing: number;
  parent:          number | null;
}
