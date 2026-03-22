import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { MovieFilters } from "../../types/movie";
import type {
  MoviesFiltersErrors,
  NumberFilterField,
} from "../../utils/validateMovieFilters";
import {
  MIN_RATING,
  MAX_RATING,
  MIN_YEAR,
  MAX_YEAR,
} from "../../constants/movieFilters";

interface MoviesFiltersProps {
  value: MovieFilters;
  errors: MoviesFiltersErrors;
  genreOptions: string[];
  onChange: (value: MovieFilters) => void;
  onApply: () => void;
  onReset: () => void;
  applyDisabled?: boolean;
}

const parseOptionalNumber = (value: string): number | undefined => {
  if (value.trim() === "") {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

const MoviesFilters = ({
  value,
  errors,
  genreOptions,
  onChange,
  onApply,
  onReset,
  applyDisabled = false,
}: MoviesFiltersProps) => {
  const handleGenresChange = (event: SelectChangeEvent<string[]>) => {
    const nextGenres = event.target.value as string[];

    onChange({
      ...value,
      genres: nextGenres,
    });
  };

  const handleNumberChange =
    (field: NumberFilterField) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        [field]: parseOptionalNumber(event.target.value),
      });
    };

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 3,
        backgroundColor: "#1e1d1d",
        boxShadow: 1,
        color: "#ffffff",
        width: "80%",
        mr: "auto",
        ml: "auto",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Фильтры
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="genres-label">Жанры</InputLabel>
          <Select
            labelId="genres-label"
            multiple
            value={value.genres}
            onChange={handleGenresChange}
            input={<OutlinedInput label="Жанры" />}
            renderValue={(selected) =>
              selected.length > 0 ? selected.join(", ") : "Не выбраны"
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2a2929",
                  color: "#ffffff",
                  "& .MuiMenuItem-root": {
                    color: "#ffffff",
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "rgba(144,202,249,0.18)",
                  },
                  "& .MuiMenuItem-root.Mui-selected:hover": {
                    backgroundColor: "rgba(144,202,249,0.28)",
                  },
                },
              },
            }}
          >
            {genreOptions.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={value.genres.includes(genre)} />
                <ListItemText primary={genre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Рейтинг от"
            type="number"
            slotProps={{
              htmlInput: {
                min: MIN_RATING,
                max: MAX_RATING,
                step: 0.1,
              },
            }}
            value={value.ratingFrom ?? ""}
            onChange={handleNumberChange("ratingFrom")}
            error={Boolean(errors.ratingFrom)}
            helperText={errors.ratingFrom}
          />
          <TextField
            fullWidth
            label="Рейтинг до"
            type="number"
            slotProps={{
              htmlInput: {
                min: MIN_RATING,
                max: MAX_RATING,
                step: 0.1,
              },
            }}
            value={value.ratingTo ?? ""}
            onChange={handleNumberChange("ratingTo")}
            error={Boolean(errors.ratingTo)}
            helperText={errors.ratingTo}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Год от"
            type="number"
            slotProps={{
              htmlInput: {
                min: MIN_YEAR,
                max: MAX_YEAR,
                step: 1,
              },
            }}
            value={value.yearFrom ?? ""}
            onChange={handleNumberChange("yearFrom")}
            error={Boolean(errors.yearFrom)}
            helperText={errors.yearFrom}
          />
          <TextField
            fullWidth
            label="Год до"
            type="number"
            slotProps={{
              htmlInput: {
                min: MIN_YEAR,
                max: MAX_YEAR,
                step: 1,
              },
            }}
            value={value.yearTo ?? ""}
            onChange={handleNumberChange("yearTo")}
            error={Boolean(errors.yearTo)}
            helperText={errors.yearTo}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", width: "100%" }}
        >
          <Button
            variant="contained"
            onClick={onApply}
            disabled={applyDisabled}
          >
            Применить
          </Button>
          <Button variant="outlined" onClick={onReset}>
            Сбросить
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MoviesFilters;
