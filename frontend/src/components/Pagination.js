import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
    return (
        <Stack direction="row" spacing={2} mt="20px" justifyContent="center">
            <Pagination count={5} color="primary" />
        </Stack>
    );
}