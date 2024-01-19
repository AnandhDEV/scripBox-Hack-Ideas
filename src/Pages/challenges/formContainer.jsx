import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { tagsList } from "../../Utils/constants";

const CustomFormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
}));

function FormContainer({ formData, handleChange, error }) {
  return (
    <CustomFormContainer>
      <TextField
        name="title"
        label="Title"
        fullWidth
        value={formData.title}
        onChange={handleChange}
        size="small"
        error={error && !formData.title}
        helperText={error && !formData.title && "Please enter Title"}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        value={formData.description}
        onChange={handleChange}
        size="small"
        error={error && !formData.description}
        helperText={
          error && !formData.description && "Please enter description"
        }
      />

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Tag</InputLabel>
        <Select
          name="tag"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.tag}
          label="Tag"
          onChange={handleChange}
        >
          {tagsList.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
        {error && !formData.description && (
          <FormHelperText>Please select Tag</FormHelperText>
        )}
      </FormControl>
    </CustomFormContainer>
  );
}

export default FormContainer;
