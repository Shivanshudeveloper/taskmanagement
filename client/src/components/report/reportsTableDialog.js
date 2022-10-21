import { 
    Box, Checkbox, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField,

 } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useState } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { API_SERVICE } from 'src/config/API';
import { useAuth } from 'src/hooks/use-auth';


const ReportsTable = () => {

    const [tasks, setTasks] = useState([]);

    const router = useRouter();
    const { user } = useAuth();
    const userId = router.query.userId;

    const fetchTasks = async (userType) => {
        
            if(userType=="admin"){
              var allTasks =`${API_SERVICE}/get_all_tasks`
            }
            else{
              var allTasks = `${API_SERVICE}/get_all_tasks/${user?.id}`
            }
        try {
            const response = await fetch(allTasks, {
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

    useEffect(async () => {
        const userId = sessionStorage.getItem("userId");
        try {
          const response = await fetch(`${API_SERVICE}/get_user/${userId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
    
          if (response.status === 200) {
            const userData = await response.json();
            var userType=userData.userType
          }
        } catch (error) {
          console.log(error);
        }
    

        fetchTasks(userType);
    }, []);

  return (
    <>
        <PerfectScrollbar>
            <Box sx={{ minWidth: 500 }}>
                <Container>
                    <h2 style={{marginTop:'10px', marginLeft:'28px'}}>All Tasks</h2>
                    <Table id='table-to-xls'>
                        <TableHead>
                        <TableRow>
                            {/* <TableCell padding="checkbox"> */}
                            {/* <Checkbox
                                checked={selectedCustomerIds.length === tasks.length}
                                color="primary"
                                indeterminate={
                                selectedCustomerIds.length > 0 &&
                                selectedCustomerIds.length < tasks.length
                                }
                                onChange={handleSelectAll}
                            /> */}
                            {/* </TableCell> */}
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
                        {tasks.map((customer) => {
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
                                // selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                            >
                                <TableCell>{customer.name}</TableCell>
                                <TableCell style={{cursor:'pointer'}} onClick={() => fetchTasks()}>
                                    {customer.assignedTo}
                                </TableCell>
                                <TableCell>{customer.fromDate}</TableCell>
                                <TableCell>{customer.targetDate}</TableCell>
                                <TableCell>{customer.points}</TableCell>
                                <TableCell>{customer.createdAt.split("T")[0]}</TableCell>

                                
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>

                    <BarChart
                        minWidth='500px'
                        width={1100}
                        height={600}
                        data={tasks}
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
                </Container>
            </Box>
        </PerfectScrollbar>
    </>
  )
}

export default ReportsTable