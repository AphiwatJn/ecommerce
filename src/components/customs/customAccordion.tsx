import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type AccordionItemType = {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

type CardHeaderType = {
  title?: string;
  description?: string;
};

type SingleAccordionProps = {
  type?: "single";
  items: AccordionItemType[];
  border?: boolean;
  cardHeader?: CardHeaderType;
};

type MultipleAccordionProps = {
  type: "multiple";
  items: AccordionItemType[];
  border?: boolean;
  cardHeader?: CardHeaderType;
};

type CustomAccordionProps = SingleAccordionProps | MultipleAccordionProps;

function CustomAccordion(props: CustomAccordionProps) {
  const { items, border = false, cardHeader } = props;
  const type = props.type ?? "single";

  const borderClass = border ? " rounded-lg border" : " ";

  const renderItems = () =>
    items.map((item) => (
      <AccordionItem
        key={item.value}
        value={item.value}
        disabled={item.disabled}
        className={border ? "border-b px-4 last:border-b-0" : "px-4"}
      >
        <AccordionTrigger
          className="focus:outline-none"
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.trigger}
        </AccordionTrigger>

        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>
    ));

  const accordion =
    type === "single" ? (
      <Accordion
        type="single"
        collapsible
        defaultValue={items?.[0]?.value}
        className={borderClass}
      >
        {renderItems()}
      </Accordion>
    ) : (
      <Accordion
        type="multiple"
        defaultValue={[items?.[0]?.value]}
        className={borderClass}
      >
        {renderItems()}
      </Accordion>
    );

  if (!cardHeader) return accordion;

  return (
    <Card className="w-full">
      <CardHeader>
        {cardHeader.title && <CardTitle>{cardHeader.title}</CardTitle>}
        {cardHeader.description && (
          <CardDescription>{cardHeader.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>{accordion}</CardContent>
    </Card>
  );
}

export default CustomAccordion;