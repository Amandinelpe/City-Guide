import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectCellRendererProps = {
  defaultValue: string;
  data: any;
  options: { label: string; value: string }[];
  onChange: (e: SelectChangeEvent<string>, data: any) => void;
};

const SelectCellRenderer = ({ defaultValue, data, options, onChange }: SelectCellRendererProps) => {
  return (
    <Select
      onChange={(e: SelectChangeEvent) => onChange(e, data)}
      value={defaultValue}
      size='small'
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectCellRenderer;