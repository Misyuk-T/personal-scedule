import { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  IconButton,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Icon,
  Button,
  Card,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ConfirmationModal, ScheduleForm } from "components";
import { ScheduleId } from "types/schedule";
import { useTypedDispatch, useTypedSelector } from "redux/store";
import { deleteSchedule } from "actions/schedule";

const ScheduleList = () => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);
  const { schedules, isLoading } = useTypedSelector((state) => state.schedule);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [fieldId, setFieldId] = useState<ScheduleId>("");

  const btnText = showAddForm ? "Close form" : "Add new schedule";

  const toggleForm = () => {
    setShowAddForm((prevState) => !prevState);
  };

  const toggleConfirmationModal = (id: ScheduleId) => () => {
    setFieldId(id);
    setShowConfirmation((prevState) => !prevState);
  };

  const handleDelete = (id: ScheduleId) => () => {
    setShowConfirmation(false);
    dispatch(deleteSchedule(user.id, id));
  };

  const handleCloseForm = () => {
    setIsEdit(false);
    setFieldId("");
  };

  const handleEdit = (id: ScheduleId) => () => {
    if (id === fieldId) {
      handleCloseForm();
    } else {
      setIsEdit(true);
      setFieldId(id);
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Schedules
      </Typography>

      <List>
        {schedules.map((item) => {
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <>
                  <IconButton
                    onClick={handleEdit(item.id)}
                    edge="end"
                    aria-label="edit"
                  >
                    <Icon component={EditIcon} color="warning" />
                  </IconButton>
                  <IconButton
                    onClick={toggleConfirmationModal(item.id)}
                    edge="end"
                    aria-label="delete"
                  >
                    <Icon component={DeleteIcon} color="error" />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ShowChartIcon style={{ color: item.color }} />
                </Avatar>
              </ListItemAvatar>

              {item.id === fieldId && isEdit ? (
                <ScheduleForm
                  onClose={handleCloseForm}
                  scheduleId={fieldId}
                  isEditForm
                />
              ) : (
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
              )}
            </ListItem>
          );
        })}
      </List>

      {showAddForm && (
        <Card
          sx={{
            padding: 3,
            width: "100%",
          }}
        >
          <ScheduleForm onClose={toggleForm} />
        </Card>
      )}
      <Button onClick={toggleForm}>{btnText}</Button>

      <ConfirmationModal
        open={showConfirmation}
        onClose={toggleConfirmationModal("")}
        onConfirm={handleDelete(fieldId)}
        text="delete this schedule"
      />
      <Backdrop open={isLoading} sx={{ zIndex: 100 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default ScheduleList;
