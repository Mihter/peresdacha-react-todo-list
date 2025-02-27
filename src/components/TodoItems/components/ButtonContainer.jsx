import React, { useState } from 'react';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    gap: 10px; 
    margin-bottom: 16px; 
`;

// Создаем стилизованные кнопки
export const SortButton = styled.button`
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

export const ResetButton = styled.button`
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

