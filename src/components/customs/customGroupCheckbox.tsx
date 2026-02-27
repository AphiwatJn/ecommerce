import { FieldGroup, FieldDescription, FieldLegend, FieldSet } from "../ui/field"
import CustomCheckbox from "./customCheckbox"

interface CheckboxItem {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

interface CustomGroupCheckboxProps {
  label?: string;
  description?: string;
  dataSet: CheckboxItem[];
  name: string; 
  className?: string;
  value: string[]; 
  onChange: (newValue: string[]) => void;
}

function CustomGroupCheckBox({ 
  label, 
  description, 
  dataSet = [],
  name,
  className ,
  value,    
  onChange    
}: CustomGroupCheckboxProps) {

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      onChange([...value, id]);
    } else {
      onChange(value.filter((val) => val !== id));
    }
  };

  if (dataSet.length === 0) return null;

  return (
    <FieldSet className={className}>
      {(label || description) && (
        <div className="flex flex-col ">
          {label && (
            <FieldLegend className="text-base font-semibold text-slate-900">
              {label}
            </FieldLegend>
          )}
          {description && (
            <FieldDescription className="text-sm text-slate-500">
              {description}
            </FieldDescription>
          )}
        </div>
      )}

      <FieldGroup className="flex flex-col gap-3">
        {dataSet.map((item) => (
        <CustomCheckbox 
            key={item.id} 
            id={`${name}-${item.id}`} 
            name={name} 
            label={item.label} 
            description={item.description}
            checked={value.includes(item.id)} 
            onCheckedChange={(isChecked) => handleCheckboxChange(item.id, isChecked)}
            disabled={item.disabled}
          />
        ))}
      </FieldGroup>
    </FieldSet>
  )
}

export default CustomGroupCheckBox