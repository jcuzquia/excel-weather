import { Box } from "@mui/material";
import React from "react";
import NRELAPIKEYForm from "../../components/NRELAPIKeyForm/NRELAPIKEYForm";
import { useUserStore } from "../../../stores/user/user.store";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <Box margin={3} sx={{ borderStyle: "dashed", borderColor: "red" }}>
      <NRELAPIKEYForm nrelEmail={user.nrelEmail} nrelKey={user.nrelAPIKey} />
    </Box>
  );
};

export default ProfilePage;
