import Message from "./Message";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageType } from "@/app/types";

const meta = {
  title: "Message",
  component: Message,
  argTypes: {
    content: { control: "text" },
    user: { control: "text" },
    timestamp: { control: "number" },
  },
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Opponent: Story = {
  args: {
    content:
      "Hello, world!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!dfgdfg!",
    user: "すずきたくと",
    timestamp: "10:10",
  },
};

export const Me: Story = {
  args: {
    content: "ssdf",
    user: "",
    timestamp: "10:11",
  },
};
