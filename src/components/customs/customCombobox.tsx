import * as React from "react"
 
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"
 
type Framework = {
  label: string
  value: string
}
 
const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]
interface CustomComboboxProp {
    placeholder : string
    emptyContext : string
    multiple: boolean | undefined
}

function CustomCombobox({
  placeholder,
  emptyContext = '',
  multiple = true,
}: CustomComboboxProp) {

  const [value, setValue] = React.useState<
    Framework | Framework[] | null
  >(multiple ? [] : null)

  React.useEffect(() => {
    setValue(multiple ? [] : null)
  }, [multiple])

  return (
    <Combobox<Framework>
      items={frameworks}
      multiple={multiple}
      value={value}
      onValueChange={(val) => setValue(val)}
      itemToStringValue={(framework) => framework.label}
    >
      {multiple ? (
        <ComboboxChips>
          <ComboboxValue>
            {Array.isArray(value) &&
              value.map((item) => (
                <ComboboxChip key={item.value}>
                  {item.label}
                </ComboboxChip>
              ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder={placeholder} />
        </ComboboxChips>
      ) : (
        <ComboboxInput placeholder={placeholder} />
      )}

      <ComboboxContent>
        <ComboboxEmpty>{emptyContext}</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem
              key={framework.value}
              value={framework}
            >
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
export default CustomCombobox