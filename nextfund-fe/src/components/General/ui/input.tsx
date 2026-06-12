import { TextField } from "@mui/material";
import { InputProps } from "../../../types/input";

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  fullWidth = false,
  startAdornment,
  endAdornment,
  sx,
  ...props

}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      variant="outlined"
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
        sx: {
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          border: 'none',
          height: '100%',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #e9ecef',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #dee2e6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #33CC33',
          },
          fontSize: '0.875rem',
        }
      }}
      sx={{
        '& .MuiInputBase-root': {
          height: '100%',
        },
        '& .MuiInputBase-input': {
          padding: '8px 12px',
          fontSize: '0.875rem',
          color: '#495057',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#6c757d',
          opacity: 1,
        },
        ...sx
      }}
      {...props}
    />
  );
};