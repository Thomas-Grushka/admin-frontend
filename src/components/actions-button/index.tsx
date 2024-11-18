import { Box, IconButton } from "@mui/material";
import React from "react";

interface ComponentProps {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface ActionsButtonProps {
  itemButton: ComponentProps[];
  sizeBtn: string;
}
export const ActionsButton: React.FC<ActionsButtonProps> = ({
  itemButton,
  sizeBtn,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {itemButton.map((item) => (
        <IconButton
          key={item.id}
          onClick={() => {
            item?.onClick();
            // handleCheckCurrency();
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: `${sizeBtn}`,
            height: `${sizeBtn}`,
            bgcolor: "primary.main",
            borderRadius: "5px",
            ":hover": {
              bgcolor: "primary.main",
              boxShadow: "0px 2px 12px 0px #00000040",
            },
          }}
        >
          {item.icon}
        </IconButton>
      ))}
    </Box>
  );
};
