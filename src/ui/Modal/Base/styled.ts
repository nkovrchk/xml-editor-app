import styled from 'styled-components';

import { TModalSize } from 'types';

export interface IOverlayStyled {
    noOverlay?: boolean;
}

export interface IModalWrapperStyled {
    size?: TModalSize;
    className?: string;
}

export const ModalWrapperStyled = styled.div<IModalWrapperStyled>`
    z-index: 2;
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    max-width: 500px;
    min-width: 200px;
    margin: auto 0;

    ${({ size }) => {
        switch (size) {
            case 's':
                return `
          background: rgba(244, 244, 248, 0.6);
          backdrop-filter: blur(50px);
          width: 224px;
          height: 210px;
        `;
            case 'm':
                return `
          width: 492px;
          min-height: 220px;
        `;
            default:
                return ``;
        }
    }}
`;

export const OverlayStyled = styled.div<IOverlayStyled>`
    display: flex;
    justify-content: center;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 200;
    /* padding: 40px 0; */
`;
