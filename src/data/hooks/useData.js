import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
      queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, 0);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

//���������� ��� �������, ������� ����� �� LS �� ��������
export const useDeleteTodoItem = () => {
    const client = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ id }) => {
            console.log("������ �������� �� LS");
            LocalStorage.deleteTodoItemFromLocalStorage(id);
        },
        onSuccess: () => {
            console.log("��������� ������");
            client.invalidateQueries(['todo']);
        },
    });

    return {
        mutate
    };
};

export const useUpdateTodoItem = () => {
    const client = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ id, checked }) => {
            console.log("������ ����������");
            LocalStorage.updateTodoItemFromLocalStorage(id, checked);
        },
        onSuccess: () => {
            console.log("��������� ������");
            client.invalidateQueries(['todo']);
        },
    });

    return {
        mutate
    };
};

export const useUpdatePriorityTodoItem = () => {
    const client = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ id, priority }) => {
            console.log("Sturt prioritize");
            LocalStorage.updateTodoItemPriorityFromLocalStorage(id, priority);
        },
        onSuccess: () => {
            console.log("update data");
            client.invalidateQueries(['todo']);
        },
    });

    return {
        mutate
    };
}