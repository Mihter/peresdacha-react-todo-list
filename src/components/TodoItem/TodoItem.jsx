import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import { TodoItemCheckbox } from './TodoItemCheckbox';
import { TodoItemPriority } from './TodoItemPriority';
import { useDeleteTodoItem } from '../../data/hooks/useData';
//сделал span т.к. сжимались
const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    overflow-wrap: anywhere;
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  border-radius: 50px;
  min-width: 20px;
  min-height: 20px;
  background-image: url(assets/images/png/delete.png);
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({id, title, checked, priority }) =>
{
    const { mutate: deleteTodoItem } = useDeleteTodoItem();

    const handleDelete = () =>
    {
        const isDelete = confirm(`Удалить элемент "${title}""${id}""${priority}" ? `);
        if (isDelete) {
            deleteTodoItem({id});
        }
    };

  return (
      <TodoItemContainer priority={priority}>
          <TodoItemCheckbox id={id} disabled={false} checked={checked} />
          <Title checked={checked}>
              {title}
          </Title>
          <TodoItemPriority id={id} priority={1}></TodoItemPriority>
          <TodoItemPriority id={id} priority={2}></TodoItemPriority>
          <TodoItemPriority id={id} priority={3}></TodoItemPriority>
          <Delete onClick={handleDelete} />
    </TodoItemContainer>
  )
}
