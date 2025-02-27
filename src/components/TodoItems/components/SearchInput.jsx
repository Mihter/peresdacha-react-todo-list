import React from 'react';
import {styled} from 'styled-components';


const Input = styled.input`
    margin-bottom: 10px;
    min-height: 25px;
`;

export const SearchInput = ({value, setValue}) => {
  const onInputChange = (event) => {
    if (setValue) { 
      setValue(event.nativeEvent.target.value);
    }
  }

    return <Input value={value} onChange={onInputChange} placeholder='Поиск' />
}