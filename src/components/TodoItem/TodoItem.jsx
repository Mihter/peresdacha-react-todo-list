import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import { useDeleteTodoItem } from '../../data/hooks/useData';
//������ span �.�. ���������
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
  min-width: 13px;
  min-height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({id, title, checked }) =>
{
    const { mutate: deleteTodoItem } = useDeleteTodoItem();

    const handleDelete = () =>
    {
        const isDelete = confirm(`������� ������� "${title}""${id}" ? `);
        if (isDelete) {
            deleteTodoItem({id});
        }
    };

  return (
    <TodoItemContainer>
          <TodoItemCheckbox id={id} disabled={false} checked={checked} />
      <Title checked={checked}>
        {title}
      </Title>
          <Delete onClick={handleDelete} />
    </TodoItemContainer>
  )
}
