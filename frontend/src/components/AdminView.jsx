import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete as DeleteIcon, Person as PersonIcon, Hotel as HotelIcon, Warning as WarningIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminView = () => {
  const { isAdmin, getAllUserStays, removeUserStay } = useAuth();
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    stay: null,
    userUid: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        // Retrieve all stays for all users
        const stays = await getAllUserStays();
        // Group stays by user UID
        const userMap = stays.reduce((acc, stay) => {
          if (!acc[stay.userUid]) {
            acc[stay.userUid] = {
              userUid: stay.userUid,
              email: stay.userEmail,
              stays: [],
            };
          }
          acc[stay.userUid].stays.push(stay);
          return acc;
        }, {});

        setUserData(Object.values(userMap)); // Convert object map to array
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbar({
          open: true,
          message: "Error fetching data",
          severity: "error",
        });
      }
    };

    fetchData();
  }, [isAdmin, navigate, getAllUserStays]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * Trigger the delete dialog for a specific user's stay.
   */
  const handleDeleteStay = (userUid, stay) => {
    setDeleteDialog({
      open: true,
      stay,
      userUid,
    });
  };

  /**
   * Confirm the deletion and remove the stay from Firestore.
   */
  const confirmDelete = async () => {
    const { stay, userUid } = deleteDialog;
    const success = await removeUserStay(userUid, stay.id);

    if (success) {
      // Update local state so the UI reflects the deleted stay.
      setUserData((prevData) =>
        prevData.map((userObj) => {
          if (userObj.userUid === userUid) {
            return {
              ...userObj,
              stays: userObj.stays.filter((s) => s.id !== stay.id),
            };
          }
          return userObj;
        })
      );

      setSnackbar({
        open: true,
        message: "Stay removed successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to remove stay",
        severity: "error",
      });
    }
    setDeleteDialog({ open: false, stay: null, userUid: null });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ width: "100%", mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleTabChange}>
              <Tab icon={<PersonIcon />} label="Users Overview" />
              <Tab icon={<HotelIcon />} label="All Bookings" />
            </Tabs>
          </Box>

          {/* Tab 1: Users Overview */}
          <TabPanel value={value} index={0}>
            <Grid container spacing={3}>
              {userData.map((userObj) => (
                <Grid item xs={12} md={6} key={userObj.userUid}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        {userObj.email}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        Total Bookings: {userObj.stays.length}
                      </Typography>
                      <List>
                        {userObj.stays.map((stay) => (
                          <ListItem
                            key={stay.id}
                            secondaryAction={
                              <IconButton edge="end" color="error" onClick={() => handleDeleteStay(userObj.userUid, stay)}>
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={stay.name} secondary={`${stay.checkinDate} - ${stay.checkoutDate}`} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Tab 2: All Bookings */}
          <TabPanel value={value} index={1}>
            <Grid container spacing={3}>
              {userData.flatMap((userObj) =>
                userObj.stays.map((stay) => (
                  <Grid item xs={12} md={6} lg={4} key={`${userObj.userUid}-${stay.id}`}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {stay.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Booked by: {userObj.email}
                        </Typography>
                        <Typography variant="body2">Check-in: {stay.checkinDate}</Typography>
                        <Typography variant="body2">Check-out: {stay.checkoutDate}</Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                          {stay.price} RON
                        </Typography>
                        <IconButton color="error" onClick={() => handleDeleteStay(userObj.userUid, stay)} sx={{ mt: 1 }}>
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </TabPanel>
        </Paper>

        {/* Delete confirmation dialog */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, stay: null, userUid: null })}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon color="warning" />
            Confirm Deletion
          </DialogTitle>
          <DialogContent>Are you sure you want to remove this booking?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, stay: null, userUid: null })}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default AdminView;
