import { Button } from "@/components/ui/button";
import { HStack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { ClipboardButton, ClipboardRoot } from "@/components/ui/clipboard";
import { Input, Badge, Stack } from "@chakra-ui/react";

export default function Chakra() {
  return (
    <>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
      <AccordionRoot collapsible defaultValue={["b"]}>
        {items.map((item, index) => (
          <AccordionItem key={index} value={item.value}>
            <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
            <AccordionItemContent>{item.text}</AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
      <ClipboardRoot value="https://chakra-ui.com">
        <ClipboardButton />
      </ClipboardRoot>
      <Stack gap="4">
        <Input placeholder="Filled" variant="subtle" />
      </Stack>
      <Stack direction="row">
        <Badge>Default</Badge>
        <Badge colorPalette="green">Success</Badge>
        <Badge colorPalette="red">Removed</Badge>
        <Badge colorPalette="purple">New</Badge>
      </Stack>
    </>
  );
}

const items = [
  { value: "a", title: "First Item", text: "Some value 1..." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
  { value: "d", title: "Fourth Item", text: "Some value 4..." },
];
