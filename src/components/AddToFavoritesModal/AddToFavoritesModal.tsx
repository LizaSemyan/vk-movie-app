import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { MovieListItem } from "../../types/movie";

interface AddToFavoritesModalProps {
  open: boolean;
  movie: MovieListItem | null;
  onClose: () => void;
  onConfirm: (movie: MovieListItem) => void;
}

const AddToFavoritesModal = ({
  open,
  movie,
  onClose,
  onConfirm,
}: AddToFavoritesModalProps) => {
  const title = movie?.name || movie?.alternativeName || "Этот фильм";

  const handleConfirm = () => {
    if (!movie) {
      return;
    }

    onConfirm(movie);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#1e1d1d",
            boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
            borderRadius: 3,
            color: "#c9d1de",
          },
        },
      }}
    >
      <DialogTitle>Добавить в избранное</DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          Вы действительно хотите добавить фильм{" "}
          <Box component="span" sx={{ fontWeight: 700 }}>
            {title}
          </Box>{" "}
          в избранное?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="text">
          Отмена
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToFavoritesModal;
