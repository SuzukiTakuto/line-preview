import type { Meta, StoryObj } from "@storybook/react";
import { MessageType } from "@/app/types";
import Calender from "./Calender";

const meta = {
  title: "Calender",
  component: Calender,
  argTypes: {
    year: { control: "number" },
    month: { control: "number" },
    dates: { control: "object" },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2021,
    month: 1,
    dates: [10, 11],
  },
};
