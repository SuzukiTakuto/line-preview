import Message from "./CalenderDate";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageType } from "@/app/types";
import { RecoilRoot } from "recoil";
import CalenderDate from "./CalenderDate";

const meta = {
  title: "CalenderDate",
  component: CalenderDate,
  argTypes: {
    date: { control: "number" },
  },
} satisfies Meta<typeof CalenderDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2021,
    month: 1,
    date: 10,
    isLogged: true,
  },
};
