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

export type Framework = {
  label: string
  value: string
}

export const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

/* ------------------------------ */
/* Discriminated Union Props */
/* ------------------------------ */

type SingleProps = {
  multiple?: false
  value: Framework | null
  setValue: React.Dispatch<React.SetStateAction<Framework | null>>
}

type MultipleProps = {
  multiple: true
  value: Framework[]
  setValue: React.Dispatch<React.SetStateAction<Framework[]>>
}

type BaseProps = {
  placeholder?: string
  emptyContext?: string
}

type CustomComboboxProps = BaseProps & (SingleProps | MultipleProps)

function CustomCombobox(props: CustomComboboxProps) {
  const {
    placeholder,
    emptyContext = "No results found.",
  } = props

  if (props.multiple) {
    return (
      <Combobox<Framework, true>
        items={frameworks}
        multiple
        value={props.value}
        onValueChange={props.setValue}
        itemToStringValue={(framework) => framework.label}
      >
        <ComboboxChips>
          <ComboboxValue>
            {props.value.map((item) => (
              <ComboboxChip key={item.value}>
                {item.label}
              </ComboboxChip>
            ))}
          </ComboboxValue>

          <ComboboxChipsInput placeholder={placeholder} />
        </ComboboxChips>

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

  return (
    <Combobox<Framework, false>
      items={frameworks}
      value={props.value}
      onValueChange={props.setValue}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder={placeholder} />

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