import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";


import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";

export const GroupsListResults = ({ customers, ...rest }) => {
  const { setSelectedTask, handleOpenSearchDialog, setToggler } = rest;
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [string,setString] = useState("");
  
  const Members=(ele)=>{
    let s=""  
    ele.forEach((m)=>{
      console.log(m);
      s = s + m
    
      s = s + " , "  
    })
    s  = s.substring(0,s.length-2)
    return s;
    };


  const { user } = useAuth();
   
   console.log(customers)
   customers.forEach(mem => {
    console.log(mem.members);
   });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteGroup = async (id) => {
    try {
      const response = await fetch(`${API_SERVICE}/delete_group/${id}/${user?.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Group deleted");
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
                <TableCell>Group Name</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => {
                return (
                  <TableRow

                    key={customer._id}

                  >

                    <TableCell>{customer.groupname}</TableCell>
                    <TableCell>{Members(customer.members)}</TableCell>
                        
                    <TableCell>
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
                            //console.log("Hello");
                            deleteGroup(customer._id);
                          }}
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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
        rowsPerPageOptions={[5, 10, 25,45]}
      />
    </Card>
  );
};

GroupsListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
