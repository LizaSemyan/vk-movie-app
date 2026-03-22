import { Box, Chip, Stack, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import type { MovieListItem } from "../../types/movie";
import { getMovieListItemMeta } from "../../utils/getMovieListItemMeta";
import {
  DEFAULT_MOVIE_GENRE_COLOR,
  MOVIE_GENRE_COLORS,
} from "../../constants/movieGenres";

interface CompareTableProps {
  comparedMovies: MovieListItem[];
}

type MovieListItemMeta = ReturnType<typeof getMovieListItemMeta>;
type CompareMovieMeta = MovieListItemMeta | null;

const CompareTable = ({ comparedMovies }: CompareTableProps) => {
  const firstMovie = comparedMovies[0];
  const secondMovie = comparedMovies[1];

  const firstMeta: CompareMovieMeta = firstMovie
    ? getMovieListItemMeta(firstMovie)
    : null;
  const secondMeta: CompareMovieMeta = secondMovie
    ? getMovieListItemMeta(secondMovie)
    : null;

  const comparedMeta: CompareMovieMeta[] = [firstMeta, secondMeta];

  const rows = [
    {
      label: "Название",
      renderValue: (meta: CompareMovieMeta) => (
        <Typography variant="body1" sx={{ fontWeight: 600, color: "#fff" }}>
          {meta?.title}
        </Typography>
      ),
    },
    {
      label: "Год выпуска",
      renderValue: (meta: CompareMovieMeta) => (
        <Typography variant="body1" sx={{ color: "#c9d1de" }}>
          {meta?.year}
        </Typography>
      ),
    },
    {
      label: "Рейтинг",
      renderValue: (meta: CompareMovieMeta) => (
        <Typography variant="body1" sx={{ color: "#c9d1de" }}>
          {meta?.rating}
        </Typography>
      ),
    },
    {
      label: "Жанры",
      renderValue: (meta: CompareMovieMeta) => {
        const genres = meta?.genres ?? [];

        if (genres.length === 0) {
          return;
        }

        return (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {genres.map((genre) => {
              const backgroundColor =
                MOVIE_GENRE_COLORS[genre.name] ?? DEFAULT_MOVIE_GENRE_COLOR;

              return (
                <Chip
                  key={genre.name}
                  label={genre.name}
                  sx={{
                    backgroundColor,
                    color: "#fff",
                    fontWeight: 500,
                  }}
                />
              );
            })}
          </Stack>
        );
      },
    },
    {
      label: "Длительность",
      renderValue: (meta: CompareMovieMeta) => (
        <Typography variant="body1" sx={{ color: "#c9d1de" }}>
          {meta?.movieLength}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#1e1d1d",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "220px 1fr 1fr",
          },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            borderRight: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#181818",
          }}
        />

        {comparedMeta.map((meta, index) => (
          <Box
            key={meta?.title ?? `empty-${index}`}
            sx={{
              p: 2,
              borderRight:
                index === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              borderTop: {
                xs: index === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                md: "none",
              },
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 120,
                  aspectRatio: "2 / 3",
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#2c2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {meta?.posterUrl ? (
                  <Box
                    component="img"
                    src={meta.posterUrl}
                    alt={meta.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <Stack
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: "100%",
                      height: "100%",
                      color: "rgba(255,255,255,0.65)",
                      px: 1,
                      textAlign: "center",
                    }}
                  >
                    <MovieIcon sx={{ fontSize: 36 }} />
                    <Typography variant="caption">
                      Постер отсутствует
                    </Typography>
                  </Stack>
                )}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#fff",
                  textAlign: { xs: "left", md: "center" },
                }}
              >
                {meta?.title ?? "Не выбран фильм для сравнения"}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>

      {rows.map((row) => (
        <Box
          key={row.label}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "220px 1fr 1fr",
            },
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "#181818",
              borderRight: {
                md: "1px solid rgba(255,255,255,0.08)",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: "#c9d1de",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {row.label}
            </Typography>
          </Box>

          {comparedMeta.map((meta, index) => (
            <Box
              key={`${row.label}-${meta?.title ?? `empty-${index}`}`}
              sx={{
                p: 2,
                borderRight:
                  index === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              {row.renderValue(meta)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default CompareTable;
