const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

export const LocalStorage = {
   getTodoItemsFromLocalStorage: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
        const defaultResult = [];
        
        if (!rawData) {
          resolve(defaultResult);
          return;
        }
        const data = JSON.parse(rawData);
    
        if (!Array.isArray(data)) {
          resolve(defaultResult);
          return;
        }
    
        resolve(data);
      }, 500);
    })
  },

    saveTodoItemToLocalStorage: (todoItem) => {
        return new Promise((resolve, reject) => {
            LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
                const newTodoItems = [...todoItems, todoItem];
                localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
                resolve();
            })
        });
    },

    //метод по удалению
    deleteTodoItemFromLocalStorage: (todoItemId) => {
        return new Promise((resolve, reject) => {
            LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
                const newTodoItems = todoItems.filter(item => item.id !== todoItemId);
                //console.log(newTodoItems);
                localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
                resolve();
            }).catch(reject);
        });
    }
}