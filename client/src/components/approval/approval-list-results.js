import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";

export const ApprovalListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { user } = useAuth();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
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
  const handleClick = async (task) => {
    // console.log(approved)
    task.approved = (task.approved === 1 ? 0 : 1);
    console.log(task._id);
    console.log(task.userId)
    console.log(user?.id);
    try {
      const response = await fetch(`${API_SERVICE}/edit_task/${task._id}/${user?.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...task})
      });
      if (response.status === 200) {
        alert("Task Updated");
        const userData = await response.json();
        console.log(userData);
        window.location.reload();
        // setToggler();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Task Name</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>Due Date</TableCell>
                {/* <TableCell>Time Taken</TableCell> */}
                <TableCell>Marks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {customer.assignedTo}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.fromDate}</TableCell>
                  <TableCell>{customer.targetDate}</TableCell>
                  {/* <TableCell>{`${customer.time} secs`}</TableCell> */}
                  <TableCell>{customer.points}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button size="small" 
                        variant="contained" 
                        color="success" 
                        onClick={() => handleClick(customer)}
                      >
                        <ThumbUpOffAltIcon fontSize="200%"></ThumbUpOffAltIcon >
                        {customer.approved}
                      </Button>
                      {/* <Button variant="contained" color="warning">
                        <ArrowBackIcon fontSize="40px"></ArrowBackIcon>
                      </Button> */}
                      <Button variant="contained" color="error">
                        <CancelIcon fontSize="40px"></CancelIcon>
                      </Button>
                      {/* <Button variant="contained" color="info">
                        <DoNotDisturbOnIcon fontSize="40px"></DoNotDisturbOnIcon>
                      </Button> */}
                    </Stack>
                  </TableCell>

                  {/* <TableCell>{format(customer.createdAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    {customer.status == "completed" ? (
                      <Chip label={customer.status} color="success" />
                    ) : (
                      <Chip label={customer.status} color="error" />
                    )}
                  </TableCell> */}
                </TableRow>
              ))}
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
  );
};

ApprovalListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
