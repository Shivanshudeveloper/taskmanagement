import { 
     Box,
     Button,
     Card,
     Checkbox, 
     Grid,
     InputAdornment,
     SvgIcon,
     Table,
     TableBody,
     TableCell,
     TableHead,
     TablePagination,
     TableRow,
     TextField
 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import PerfectScrollbar from "react-perfect-scrollbar";
import { 
     BarChart,
     Bar,
     Cell,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer
 } from 'recharts';
import { API_SERVICE } from 'src/config';
import { useAuth } from 'src/hooks/use-auth';
import { Refresh } from 'src/icons/refresh';
import { Search as SearchIcon } from "../../icons/search";

const ReportTable = ({customers}) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [searchVal, setSearchVal] = useState('')
    

    const fetchTasks = async (name='') => {
        // console.log(searchVal, name)
        try {
            const response = await fetch(`${API_SERVICE}/get_all_tasks/${user?.id}?name=${name}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            });
            if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            setTasks(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const { user } = useAuth();

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
        newSelectedCustomerIds = tasks.map((customer) => customer._id);
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
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

  return (
    <Card >
        <PerfectScrollbar>
            <Box sx={{ minWidth: 500 }}>
                    <h2 style={{marginTop:'10px', marginLeft:'28px'}}>All Tasks</h2>
                <Grid flexDirection='row' sx={{ minWidth: 500 }} display='flex' justifyContent='space-between' padding='12px 20px'>
                    <TextField
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        sx={{ minWidth: 500 }}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SvgIcon color="action" fontSize="small"  style={{cursor:'pointer'}} 
                                    onClick={() => fetchTasks(searchVal)}>
                                  <SearchIcon 
                                    // style={{marginRight:'8px'}}
                                  />
                                </SvgIcon>
                                <SvgIcon color="action" fontSize="small"  style={{cursor:'pointer'}} onClick={() => fetchTasks()}>
                                  <Refresh
                                  />
                                </SvgIcon>
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Search Task"
                          variant="outlined"
                    />
                    <Grid item>
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
                </Grid>
                <Table id='table-to-xls'>
                    <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                        <Checkbox
                            checked={selectedCustomerIds.length === tasks.length}
                            color="primary"
                            indeterminate={
                            selectedCustomerIds.length > 0 &&
                            selectedCustomerIds.length < tasks.length
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
                    {tasks.slice(0, limit).map((customer) => {
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
                            <TableCell style={{cursor:'pointer'}} onClick={() => fetchTasks(customer.assignedTo)}>
                                {customer.assignedTo}
                            </TableCell>
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
            count={tasks.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
        />
        
        <BarChart
            minWidth='500px'
            width={1000}
            height={600}
            data={customers}
            margin={{
                top: 80,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="assignedTo" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="points" fill="#8884d8" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
    </Card>
  )
}

export default ReportTable