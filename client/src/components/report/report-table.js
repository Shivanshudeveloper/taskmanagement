import { Box, Button, Card, Checkbox, Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useState } from 'react'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import PerfectScrollbar from "react-perfect-scrollbar";
import { useAuth } from 'src/hooks/use-auth';

const ReportTable = ({customers}) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const { user } = useAuth();

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
        newSelectedCustomerIds = customers.map((customer) => customer._id);
        } else {
        newSelectedCustomerIds = [];
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCustomerIds.indexOf(id);
        let newSelectedCustomerIds = [];

        if (selectedIndex === -1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
        } else if (selectedIndex === 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(
            selectedCustomerIds.slice(0, selectedIndex),
            selectedCustomerIds.slice(selectedIndex + 1)
        );
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handlePrint = () => {
        window.print();
    }
  return (
    <Card >
        <PerfectScrollbar>
            <Box sx={{ minWidth: 500 }}>
                <Grid flexDirection='row' sx={{ minWidth: 500 }} display='flex' justifyContent='space-between' padding='12px 20px'>
                    <h3>All Tasks</h3>
                    <Button onClick={handlePrint}>
                        Print
                    </Button>
                    <ReactHtmlTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                    />
                </Grid>
                <Table id='table-to-xls'>
                    <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                        <Checkbox
                            checked={selectedCustomerIds.length === customers.length}
                            color="primary"
                            indeterminate={
                            selectedCustomerIds.length > 0 &&
                            selectedCustomerIds.length < customers.length
                            }
                            onChange={handleSelectAll}
                        />
                        </TableCell>
                        <TableCell>Task</TableCell>
                        {/* <TableCell>Assigned to</TableCell> */}
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Assigned On</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Created At</TableCell>

                        {/* <TableCell>Status</TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {customers.slice(0, limit).map((customer) => {
                        var color;
                        if (customer.status == 0) {
                        color = "#D14343";
                        } else {
                        color = "#14B8A6";
                        }
                        return (
                        <TableRow
                            style={{ backgroundColor: color }}
                            hover
                            key={customer._id}
                            selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                        >
                            <TableCell padding="checkbox">
                            <Checkbox
                                checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                                onChange={(event) => handleSelectOne(event, customer._id)}
                                value="true"
                            />
                            </TableCell>
                            <TableCell>{customer.name}</TableCell>
                            {/* <TableCell>
                            <Box
                                sx={{
                                alignItems: "center",
                                display: "flex",
                                }}
                            >
                                <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                                {getInitials(customer.name)}
                                </Avatar>
                                <Typography color="textPrimary" variant="body1">
                                {customer.name}
                                </Typography>
                            </Box>
                            </TableCell> */}
                            <TableCell>{customer.assignedTo}</TableCell>
                            <TableCell>{customer.fromDate}</TableCell>
                            <TableCell>{customer.targetDate}</TableCell>
                            <TableCell>{customer.points}</TableCell>
                            <TableCell>{customer.createdAt.split("T")[0]}</TableCell>

                            {/* <TableCell>
                            {customer.status == "completed" ? (
                                <Chip label={customer.status} color="success" />
                            ) : (
                                <Chip label={customer.status} color="error" />
                            )}
                            </TableCell> */}
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
        <TablePagination
            component="div"
            count={customers.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
        />
    </Card>
  )
}

export default ReportTable