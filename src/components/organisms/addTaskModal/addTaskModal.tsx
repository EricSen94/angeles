import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { STRINGS } from "constans/strings";
import { Category } from "entities/categories/categories.types";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface AddTaskModalProps {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    description: string;
  }) => void;
}

const AddTaskModal = ({
  open,
  onClose,
  onSubmit,
  categories,
}: AddTaskModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
  }, [name, category, description]);

  const handleSubmit = () => {
    onSubmit({ name, category, description });
    setName("");
    setCategory("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      data-testid="add-task-modal"
    >
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", fontSize: "24px", fontWeight: 400 }}
        >
          {STRINGS.addTaskModal.title}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: "16px" }}>
          {STRINGS.addTaskModal.name}
        </Typography>

        <TextField
          data-testid="add-task-name"
          fullWidth
          variant="filled"
          label=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          sx={{
            bgcolor: "#F3F3F3",
            "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
              {
                border: "none",
              },
          }}
        />

        <Typography variant="body2" sx={{ fontSize: "16px" }}>
          {STRINGS.addTaskModal.category}
        </Typography>

        <FormControl fullWidth margin="normal">
          <Select
            data-testid="add-task-category"
            labelId="custom-modal-select-label"
            value={category}
            label=""
            variant="filled"
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              bgcolor: "#F3F3F3",
              "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                {
                  border: "none",
                },
            }}
          >
            {categories?.map((cat) => (
              <MenuItem value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
          {STRINGS.addTaskModal.description}
        </Typography>

        <TextField
          data-testid="add-task-description"
          fullWidth
          label=""
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          sx={{
            bgcolor: "#F3F3F3",
            "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
              {
                border: "none",
              },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ bgcolor: "#999A9A" }}
          >
            Cancelar
          </Button>
          <Button
            data-testid="add-task-button"
            variant="contained"
            disabled={!name.trim() || !category.trim() || !description.trim()}
            onClick={handleSubmit}
            sx={{ bgcolor: "#0D14D1" }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
