import styled from 'styled-components';

import { ButtonStyled } from 'components/Button/styled';

import { BaseModal } from './Base';
import { IModalUI } from './types';

export const ModalContainer = styled.div`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    :focus {
        outline: none;
    }

    svg {
        pointer-events: none;
    }

    path {
        pointer-events: auto;
    }

    input {
        &::-ms-clear {
            display: none;
        }
    }
`;

export const ModalBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 -88px;
    padding: 0 88px 40px;
    height: 100%;
`;

export const ModalFooter = styled.div`
    width: 100%;
    height: 88px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #ffffff;
    backdrop-filter: blur(50px);

    ${ButtonStyled} {
        margin-left: 16px;
    }
`;

export const ModalWrapper = styled(BaseModal)<IModalUI>`
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #ffffff;

    ${({ size }) => {
        switch (size) {
            case 'xxs':
                return `
          max-width: 492px;
          min-height: 180px;
          padding: 24px 24px 0;

          ${ModalFooter} {
            height: 76px;
          }

          ${ModalBody} {
            margin-left: -24px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;
          }
        `;
            case 'xs':
                return `
          max-width: 492px;
          min-height: 330px;
          padding: 24px 24px 0;

          ${ModalFooter} {
            height: 76px;
          }

          ${ModalBody} {
            margin-left: -24px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;
          }
        `;
            case 's':
                return `
          max-width: 664px;
          min-height: 480px;
          padding: 48px 56px 0;

          ${ModalBody} {
            margin-left: -56px;
            margin-right: -56px;
            padding-left: 56px;
            padding-right: 56px;
          }
        `;
            case 'm':
                return `
          max-width: 836px;
          min-height: 580px;
          padding: 76px 88px 0;
        `;
            case 'l':
                return `
          max-width: 836px;
          min-height: 580px;
          padding: 76px 88px 0;
        `;
            case 'xl':
                return `
          max-width: 836px;
          min-height: 580px;
          padding: 76px 88px 0;
        `;
            default:
                return `
          max-width: 100%;
          width: 100vw;
          min-height: 100vh;
          padding: 40px 0;
        `;
        }
    }}
`;

export const ModalInner = styled(ModalContainer)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
`;
