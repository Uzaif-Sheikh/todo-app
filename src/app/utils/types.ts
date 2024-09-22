export type todo = {
    id: number;
    title: string;
    description: string;
    created_date: Date;
    completed_date: Date | null;
    is_completed: boolean;
};

export type todoList = {
    id: number;
    title: string,
    todos: todo[];
}

export type appData = {
    global_id: number;
    todoList: todoList[];
}