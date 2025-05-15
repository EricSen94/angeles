import { Grid, Typography } from "@mui/material";
import Dot from "components/atoms/dot/dot";
import { Category } from "entities/categories/categories.types";

interface CategoriesDotProps {
  category: Partial<Category>;
}
const CatgoriesDot = ({ category }: CategoriesDotProps) => {
  return (
    <Grid container alignItems="center" data-testid="categories-dot">
      <Grid size={2}>
        <Dot color={category.color!} />
      </Grid>
      <Grid size={10} sx={{ alignItems: "start" }}>
        <Typography
          data-testid="category-name"
          variant="h6"
          color="text.secondary"
          sx={{
            fontSize: "16px",
            color: "#000000",
            fontWeight: 400,
            textAlign: "left",
            marginLeft: "8px",
          }}
        >
          {category.name}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CatgoriesDot;
