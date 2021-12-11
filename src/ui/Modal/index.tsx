import React from 'react';

import { ModalWrapper, ModalInner, ModalFooter, ModalBody } from './styled';
import { IModalUI } from './types';

export interface IModalComponent extends IModalUI {
    moreList?: React.ReactNode;
    onClose: () => void;
}

export const Modal: React.FC<IModalComponent> = ({ onClose, children, size }) => {
    const handleClose = size ? onClose : () => {};

    return (
        <ModalWrapper size={size} onClose={handleClose}>
            <ModalInner>{children}</ModalInner>
        </ModalWrapper>
    );
};

export { ModalBody, ModalFooter };
