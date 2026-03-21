import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: "#1e1d1d",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderRadius: 0,
          border: 0,
          width: "100%",
          margin: 0,
          maxWidth: "100%",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#c9d1de",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#c9d1de",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#61656b",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c9d1de",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c9d1de",
          },
        },
      },
    },
  },
});
