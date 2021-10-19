import React from 'react';
import styled from '@emotion/styled';

const HeaderStyled = styled.header`
    background-color: #fff;
    padding: 3rem;
    display: flex;
    justify-content: center;
`;

const Header = ({ titulo }) => {
    return (
        <HeaderStyled>
            <h1>{titulo}</h1>
        </HeaderStyled>
    );
}

export default Header;