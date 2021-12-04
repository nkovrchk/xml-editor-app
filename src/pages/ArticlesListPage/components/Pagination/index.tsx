import React, { useMemo } from 'react';

import { Box } from 'components/Box';

import { PageStyled } from './styled';

export interface IPagination {
    pages: number[];
    currentPage: number;
    handleChange: (page: number) => void;
}

export const Pagination: React.FC<IPagination> = ({ pages, currentPage, handleChange }) => {
    const renderPages = useMemo(() => {
        return pages.map((page, i) => {
            const isSelected = page === currentPage;
            const onClick = !isSelected ? () => handleChange(page) : undefined;

            return (
                <PageStyled key={`${page}-${i}`} isSelected={isSelected} onClick={onClick}>
                    <Box>{page}</Box>
                </PageStyled>
            );
        });
    }, [currentPage, handleChange, pages]);

    return (
        <Box display="flex" justifyContent="center" py={8}>
            <Box display="flex">{renderPages}</Box>
        </Box>
    );
};
