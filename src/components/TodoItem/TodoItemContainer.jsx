import styled, { css } from "styled-components";

const greenPriorityCss = css`
  background: #69FF5F;
`

const yellowPriorityCss = css`
  background: #FDFF5F;
`
const redPriorityCss = css`
  background: #FF5F5F;
`


const Root = styled.div(props => {
    return `
    display: flex;
    gap: 9px;
    align-items: center;
    padding: 5px 5px;
    border-radius: 10px;
    ${props.priority === 1 ? greenPriorityCss : ''}
    ${ props.priority === 2 ? yellowPriorityCss : ''}
    ${ props.priority === 3 ? redPriorityCss : ''}
  `;
});


export const TodoItemContainer = ({children, priority}) => {
    return <Root priority={priority}>{children}</Root>
}