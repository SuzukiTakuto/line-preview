import type { Preview } from "@storybook/react";
import Image from "next/image";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

Image.defaultProps = {
  ...Image.defaultProps,
  unoptimized: true,
};

export default preview;
