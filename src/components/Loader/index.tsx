import React from 'react';

import { Box } from 'components/Box';

import { LoaderStyled } from './styled';

export const Loader: React.FC = () => {
    return (
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
            <LoaderStyled />
        </Box>
    );
};
