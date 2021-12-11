import React, { useState, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';

import { OverlayStyled, ModalWrapperStyled, IOverlayStyled, IModalWrapperStyled } from './styled';

export interface IModalUI extends IOverlayStyled, IModalWrapperStyled {
    visible?: boolean;
    onClose?: (e?: SyntheticEvent) => void;
    onClick?: (e?: SyntheticEvent) => void;
}

// const ESC = 27;

const handleClickModal = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
};

export const BaseModal: React.FC<IModalUI> = ({
    children,
    visible = true,
    noOverlay,
    size,
    className,
    onClose = () => {},
    onClick = handleClickModal,
}) => {
    const [isClickedInside, setIsClickedInside] = useState(false);
    const modalRoot = document.getElementById('modal-root');

    const handleMouseUp = (event: React.MouseEvent) => {
        if (!isClickedInside) {
            onClose(event);
        }

        setIsClickedInside(false);
    };

    const handleMouseDown = () => {
        setIsClickedInside(true);
    };

    // useEffect(() => {
    //   document.body.addEventListener('keyup', handleKeyUp);

    //   return () => {
    //     document.body.removeEventListener('keyup', handleKeyUp);
    //   };
    // }, [handleKeyUp]);

    if (!visible) {
        return null;
    }

    const Portal = (
        <OverlayStyled noOverlay={noOverlay} onMouseUp={handleMouseUp}>
            <ModalWrapperStyled className={className} onClick={onClick} size={size} onMouseDown={handleMouseDown}>
                {children}
            </ModalWrapperStyled>
        </OverlayStyled>
    );

    return modalRoot ? ReactDOM.createPortal(Portal, modalRoot) : null;
};
