import styled from 'styled-components';

export const LoaderStyled = styled.div`
    font-size: 6px;
    position: relative;
    text-indent: -9999em;
    border-top: 8px solid rgba(149, 149, 149, 0.2);
    border-right: 8px solid rgba(149, 149, 149, 0.2);
    border-bottom: 8px solid rgba(149, 149, 149, 0.2);
    border-left: 8px solid rgba(149, 149, 149, 0.6);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;

    &,
    &:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }

    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`;
