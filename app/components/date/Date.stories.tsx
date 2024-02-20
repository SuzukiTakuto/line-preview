import Date from "./Date";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageType } from "@/app/types";

const meta = {
  title: "Date",
  component: Date,
  argTypes: {
    date: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: "2021-10-10",
  },
};
