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
  Box,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ConfirmationModal, ScheduleForm } from "components";
import { Schedule, ScheduleId } from "types/schedule";
import { useTypedDispatch, useTypedSelector } from "redux/store";
import { deleteSchedule } from "actions/schedule";

interface ScheduleListProps {
  schedules: Schedule[];
}

const ScheduleList = ({ schedules }: ScheduleListProps) => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [fieldId, setFieldId] = useState<ScheduleId>("");

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
      <Typography sx={{ mt: 4 }} variant="h6" component="div">
        Schedules
      </Typography>

      <List>
        {schedules.map((item) => {
          const isShowEditForm = item.id === fieldId && isEdit;

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

              {isShowEditForm ? (
                <Box width="100%">
                  <ScheduleForm
                    onClose={handleCloseForm}
                    scheduleId={fieldId}
                    isEditForm
                  />
                </Box>
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

      {showAddForm ? (
        <Card
          sx={{
            padding: 3,
            width: "100%",
          }}
        >
          <ScheduleForm onClose={toggleForm} />
        </Card>
      ) : (
        <Button onClick={toggleForm}>Add new schedule</Button>
      )}

      <ConfirmationModal
        open={showConfirmation}
        onClose={toggleConfirmationModal("")}
        onConfirm={handleDelete(fieldId)}
        text="delete this schedule"
      />
    </Grid>
  );
};

export default ScheduleList;
