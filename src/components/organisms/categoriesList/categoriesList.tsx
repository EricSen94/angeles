import { Box, Grid, Typography } from "@mui/material";
import CatgoriesDot from "components/molecules/categoriesDot/categoriesDot";
import { STRINGS } from "constans/strings";
import { Category } from "entities/categories/categories.types";
interface CategoriesListProps {
  categories: Category[];
}
const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <Grid size={3} data-testid="categories-list">
      <Box
        columnGap={2}
        sx={{
          backgroundColor: "#EAEAEA80",
          height: "580px",
          width: "280px",
          margin: "0px 25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        />
        <Grid container sx={{ margin: "16px 0px" }}>
          <Grid size={12}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "20px",
                textAlign: "start",
                marginLeft: "16px",
                marginBottom: "20px",
              }}
            >
              {STRINGS.categories}
            </Typography>
          </Grid>
          <Grid container rowGap={0.5} sx={{ marginLeft: "16px" }}>
            {categories.map((category, index) => (
              <Grid size={12} key={index}>
                <CatgoriesDot category={category} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
export default CategoriesList;
