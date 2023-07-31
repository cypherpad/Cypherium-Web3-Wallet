import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },

  styles: {
    global: {
      body: {
        bg: "#347AF0",
        color: "gray.900",
      },
    },
  },
});

export const appTheme = {
  styles: {
    global: {
      body: {
        bg: "#347AF0",
        color: "gray.900",
      },
    },
  },
}