import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ApprovalListResults } from "../components/approval/approval-list-results";
import { ApprovalListToolbar } from "../components/approval/approval-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import approvals from "../__mocks__/approvals";

const Customers = () => (
  <>
    <Head>
      <title>Customers | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <ApprovalListToolbar />
        <Box sx={{ mt: 3 }}>
          <ApprovalListResults customers={approvals} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
