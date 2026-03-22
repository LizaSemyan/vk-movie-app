import { Button, Stack, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CompareTable from "../../components/CompareTable";
import { useCompare } from "../../hooks/useCompare";

const ComparePage = () => {
  const { comparedMovies, clearCompare } = useCompare();

  return (
    <Stack spacing={4} alignItems="center">
      <Typography variant="h4">Сравнение фильмов</Typography>

      {comparedMovies.length === 0 ? (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "80%",
            minHeight: 300,
            borderRadius: 3,
            backgroundColor: "#1e1d1d",
            textAlign: "center",
            px: 3,
            mx: "auto",
            boxSizing: "border-box",
          }}
        >
          <CompareArrowsIcon
            sx={{
              fontSize: 48,
              color: "rgba(255,255,255,0.6)",
            }}
          />

          <Typography variant="h6">Список сравнения пока пуст</Typography>

          <Typography variant="body1" sx={{ color: "#c9d1de" }}>
            Добавьте один или два фильма, чтобы увидеть сравнительную таблицу.
          </Typography>
        </Stack>
      ) : (
        <Stack
          spacing={3}
          sx={{
            width: "80%",
            minHeight: 300,
            borderRadius: 3,
            textAlign: "center",
            px: 3,
            mx: "auto",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="body1" sx={{ color: "#c9d1de" }}>
            Можно сравнивать до двух фильмов. При добавлении третьего первый
            выбранный фильм автоматически удаляется из сравнения.
          </Typography>

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="outlined" onClick={clearCompare}>
              Очистить сравнение
            </Button>
          </Stack>

          <CompareTable comparedMovies={comparedMovies} />
        </Stack>
      )}
    </Stack>
  );
};

export default ComparePage;
