
import Component from '../DropDown/index'
import styled from 'styled-components'
const StyledWrapper = styled.div`
    & .ListItem{
        color:red !important
        
    }
    & ul {
        list-style-type: none;
    }
`;

export default (props) => {
    return <>
        <StyledWrapper>
            <Component {...props} styled={StyledWrapper} />
        </StyledWrapper>
    </>;
};