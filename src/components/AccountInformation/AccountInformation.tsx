import { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Avatar,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  Box,
  Link,
} from "@mui/material";

import { Alert } from "../Alert";

import { useTypedDispatch, useTypedSelector } from "redux/store";
import { updateUser, uploadMedia } from "actions/user";
import { setLoading } from "redux/reducers/userSlice";
import { User } from "types/user";
import { UPDATE_DATA } from "helpers/constants";

interface AccountInformationProps {
  userInformation: User;
}

export const AccountInformation = ({
  userInformation,
}: AccountInformationProps) => {
  const dispatch = useTypedDispatch();
  const { isLoading } = useTypedSelector((state) => state.user);

  const [media, setMedia] = useState<File | undefined>();
  const [localUrl, setLocalUrl] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const toggleAlert = () => {
    setShowAlert((prevState) => !prevState);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setMedia(file);
    setLocalUrl(URL.createObjectURL(file || ({} as MediaSource)));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!media) return;
    dispatch(setLoading(true));

    await uploadMedia("avatars", userInformation.id, media)
      .then((uploadUrl) => {
        dispatch(updateUser(userInformation.id, { photo: uploadUrl }));
        setLocalUrl("");
        toggleAlert();
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="column" alignItems="center">
          <Box sx={{ m: 1, position: "relative" }}>
            <Avatar
              src={userInformation.photo}
              sx={{
                opacity: isLoading ? 0.5 : 1,
                height: 100,
                mb: 2,
                width: 100,
              }}
            />
            {isLoading && (
              <CircularProgress
                size={100}
                sx={{
                  color: "green[500]",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              />
            )}
          </Box>

          <Typography color="textPrimary" gutterBottom variant="h5">
            {userInformation.name}
          </Typography>
          <Typography color="textPrimary" variant="subtitle1">
            {userInformation.statement}
          </Typography>
          <Link
            href={`https://${userInformation.website}`}
            target="_blank"
            underline="hover"
          >
            {userInformation.website}
          </Link>
        </Stack>
      </CardContent>
      <Divider />

      <CardActions>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            onChange={onImageChange}
            id="userAvatar"
            type="file"
          />
          <label htmlFor="userAvatar">
            <Button
              component="span"
              color="primary"
              fullWidth
              variant="text"
              disabled={isLoading}
            >
              Upload {localUrl && "other"} picture
            </Button>
          </label>

          {localUrl && (
            <>
              <Avatar
                src={localUrl}
                sx={{
                  height: 64,
                  m: "10px auto",
                  width: 64,
                }}
              />

              <Button
                color="success"
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                Confirm avatar
              </Button>
            </>
          )}
        </form>
      </CardActions>

      <Alert
        onToggle={toggleAlert}
        showAlert={showAlert}
        message={UPDATE_DATA}
      />
    </Card>
  );
};

export default AccountInformation;
