import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";

export const TaskListResults = ({ customers, ...rest }) => {
  const { setSelectedTask, handleOpenSearchDialog, setToggler } = rest;
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

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_SERVICE}/delete_task/${id}/${user?.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Task deleted");
        setToggler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 500 }}>
          <Table>
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
                <TableCell>Action</TableCell>
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

                    <TableCell>
                      {/* <Tooltip title="View">
                        <IconButton
                          onClick={() => {
                            console.log("Hello");
                            router.push(`/dashboard/campaigns/${row._id}`);
                          }}
                          aria-label="upload picture"
                          component="span"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            console.log(customer);
                            setSelectedTask(customer);
                            handleOpenSearchDialog();
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            console.log("Hello");
                            deleteTask(customer._id);
                          }}
                          //   color="error"
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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
  );
};

TaskListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
