import React from 'react';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { Modal, ModalBody, ModalFooter } from 'ui/Modal';

interface IDeleteModalComponent {
    onDelete: () => void;
    onClose: () => void;
}

export const DeleteModal: React.FC<IDeleteModalComponent> = ({ onDelete, onClose }) => {
    return (
        <Modal onClose={onClose} size="xxs">
            <ModalBody>
                <Text pb={4} variant="body1SemiBold">
                    Точно хотите удалить статью?
                </Text>
                <Text>Восстановить статью не получится, придется создать заново</Text>
            </ModalBody>
            <ModalFooter>
                <Box display="flex">
                    <Button onClick={onDelete} variant="delete">
                        да, удалить
                    </Button>
                    <Button onClick={onClose} variant="secondary">
                        нет, оставить
                    </Button>
                </Box>
            </ModalFooter>
        </Modal>
    );
};
