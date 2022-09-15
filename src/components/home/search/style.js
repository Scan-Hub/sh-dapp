import styled from 'styled-components';

export const Input = styled.input`
    width: 222px;
    height: 51px;
    padding: 10px;
    background: #f3f3f3;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: none;
`;

export const Ul = styled.ul`
    display: contents;
`;

export const Li = styled.li`
    width: 100%;
    font-weight: bold;
    padding: 10px;
    display: block;
    border: 1px solid;
    border-image-source: linear-gradient(90deg, rgba(210, 192, 241, 0.1) 0%, rgba(179, 150, 230, 0.32) 51.04%, rgba(210, 192, 241, 0.1) 100%);
    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.14);
    }
`;

export const SuggestContainer = styled.div`
    background: rgba(13, 21, 34, 0.5);
    backdrop-filter: blur(100px);
    border-radius: 8px;
    width: 100%;
    padding: 1rem;
    padding-bottom: 2rem;
    height: auto;
    overflow:hidden;
`;

export const SuggestList = styled.div`
    margin: 0 auto;
    width: 99%;
    height: auto;
    max-height: 410px;
    overflow-y: scroll;
    &::-webkit-scrollbar-thumb {
        background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
        box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
        border-radius: 100px;
      }
`;