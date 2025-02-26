import React, { useState } from 'react';
import styled from 'styled-components';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');

  const [sortOrder, setSortOrder] = useState('asc');

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

    // Создаем стилизованные кнопки
    const SortButton = styled.button`
    background-color: #4CAF50; 
    color: white; 
    padding: 10px 20px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 

    &:hover {
        background-color: #45a049; 
    }
`;

    const ResetButton = styled.button`
    background-color: #f44336; 
    color: white; 
    padding: 10px 20px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 

    &:hover {
        background-color: #e53935; 
    }
`;

    const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    gap: 16px; 
    margin-bottom: 16px; 
`;

  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
    const filteredBySearchItems = todoItems.filter((todoItem) => {
        const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();//очистка от пробелов + приведение к одному из регистров
        if (clearedSearchValue.length < 3) {
            return true;//просто возвращаю true как и в начале выводя весь список
        }

        const clearedTodoItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();//очистка от пробелов + приведение к одному из регистров
        const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue) >= 0;//проверка вхождения строки поиска в строку заголовка


        return isSearched; // Возвращаем true, если подстрока найдена
    });

    //использовать метод sort
    const sortedItems = filteredBySearchItems.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.priority - b.priority;
        } else if (sortOrder === 'desc') {
            return b.priority - a.priority;
        }
        else {
            return todoItems;
        }
    });

    // Обработчик для переключения сортировки
    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const drainTank = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? '' : ''));
    };

    //добавляем кнопку сортировки
    //значение текущей сортировки хранится в локальном стейте
    //перед выводом элементов нужно провести сортировку с помощью метода sort
    const todoItemsElements = sortedItems.map((item, index) => {
      if (item && item.title) {
          return <TodoItem key={item.id} id={item.id} title={item.title} checked={item.isDone} priority={item.priority} />;
      }
      return <TodoItem key={22} id={1} title={'item.title'} checked={true} priority={1} />;//тут были шаманские фокусы т.к. как то попал null элемент 
                                                                                        //в LS и слишком долго пытался как - то это пофиксить в итоге
                                                                                        //просто сбросил хранилище
                                                                              
  });
  
    return (

        <>
            <ButtonContainer>
                <SortButton onClick={toggleSortOrder}>
                    Сортировать по {sortOrder === 'asc' ? '↑убыванию↑' : '↓возрастанию↓'}
                </SortButton>
                <ResetButton onClick={drainTank}>
                    Смыть за собой?
                </ResetButton>

            </ButtonContainer>
            <SearchInput value={searchValue} setValue={setSearchValue} />
            <TodoItemsContainer>
                {todoItemsElements}
            </TodoItemsContainer>
            <NewTodoItem />
        </>
  )
}