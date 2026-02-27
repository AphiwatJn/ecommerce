import { Checkbox } from "../ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"

interface CustomCheckboxProps {
  label: string;
  id: string;
  name?: string;
  checked?: boolean; // เพิ่มเพื่อรองรับการคุมสถานะจากภายนอก
  onCheckedChange?: (checked: boolean) => void; // สำหรับรับค่าไปทำ Backend
  defaultChecked?: boolean;
  description?: string;
  disabled?: boolean;
}

function CustomCheckbox({ 
  label, 
  id, 
  name, 
  checked,
  onCheckedChange,
  defaultChecked, 
  description, 
  disabled = false 
}: CustomCheckboxProps) { 
    // แยก Logic ความจางของสีเมื่อ Disabled ไว้ที่นี่ที่เดียว
    const stateClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    return (
      <FieldGroup className="w-full">
        <Field 
          orientation="horizontal" 
          className={`flex items-start gap-3 py-1 ${disabled ? "pointer-events-none" : ""}`}
          data-disabled={disabled}
        >
          <Checkbox 
            id={id} 
            name={name || id} 
            checked={checked}
            onCheckedChange={onCheckedChange}
            defaultChecked={defaultChecked} 
            disabled={disabled}
          />
          
          <FieldContent className="flex flex-col gap-1 leading-none mt-0.5">
            <FieldLabel 
              htmlFor={id}
              className={`text-sm font-medium leading-none ${stateClass}`}
            >
              {label}
            </FieldLabel>
            
            {description && (
              <FieldDescription className={`text-xs leading-normal ${stateClass}`}>
                {description}
              </FieldDescription>
            )}
          </FieldContent>
        </Field>
      </FieldGroup>
    );
}

export default CustomCheckbox;