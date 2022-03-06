export interface Todo {
  id: string;
  assigneeId: string;
  title: string;
  done: boolean;
}

export interface TodoStatus {
  totalCount: number;
  doneCount: number;
}
