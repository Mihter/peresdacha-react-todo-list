import styled, { css } from "styled-components";
import { useUpdatePriorityTodoItem } from "../../data/hooks/useData";

const priorityGreenCss = css`
  background-image: url(assets/images/png/green_priority.png);
`

const priorityYellowCss = css`
  background-image: url(assets/images/png/yellow_priority.png);
`
const priorityRedCss = css`
  background-image: url(assets/images/png/red_priority.png);
`

//поставил минимум 20х20 чтобы не сжимались
export const TodoItemPriorityConteiner = styled.span(props => {
    return `
    display: inline-block;
    min-width: 13px;
    min-height: 13px;
    ${props.priority === 1 ? priorityGreenCss : ''}
    ${props.priority === 2 ? priorityYellowCss : ''}
    ${props.priority === 3 ? priorityRedCss : ''}
    background-position: center;
    background-repeat: no-repeat;
    background-size: 13px;
    cursor: pointer;


  `;
});


export const TodoItemPriority = ({ id, priority }) => {
    const { mutate } = useUpdatePriorityTodoItem();
    const handlePriorityClick = () => {

        if (true) {
            mutate({id, priority});
            console.log("Task priority:");
            console.log(priority);

        }

    };
    return <TodoItemPriorityConteiner id={id} priority={priority} onClick={handlePriorityClick} />
}