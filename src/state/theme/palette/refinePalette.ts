export const RefinePalettes = {
  Brown: {
    mode: "light",
    primary: {
      main: "#BA9B9A",
      light: "#C4A8AD",
      dark: "#8C7465",
      contrastText: "#592720",
    },
    secondary: {
      main: "#412C37",
      light: "#6F4F4E",
      dark: "#412C37",
      contrastText: "#261403",
    },
    text: {
      primary: "#000000",
      secondary: "#261403",
      hint: "#322110",
    },
  },
  BrownDark: {
    mode: "dark",
    primary: {
      main: "#3e2723",
      light: "#795548",
      dark: "#3e2723",
      contrastText: "#D2B48C",
    },
    secondary: {
      main: "rgba(79,7,107,0.87)",
      light: "rgba(106,20,140,0.87)",
      dark: "rgba(44,6,57,0.87)",
      contrastText: "#D2B48C",
    },
    text: {
      disabled: "#ff0000",
      hint: "#ff0000",
      secondary: "#D2B48C",
      primary: "#D2C5B9",
    },
  },
  Purple: {
    mode: "light",

    primary: {
      main: "#7B1FA2",
      light: "#954bb4",
      dark: "#561571",
    },
  },
  PurpleDark: {
    mode: "dark",
    primary: {
      main: "#AB47BC",
      light: "#bb6bc9",
      dark: "#773183",
    },
  },
  Magenta: {
    mode: "light",
    primary: {
      main: "#C2185B",
      light: "#ce467b",
      dark: "#87103f",
    },
  },
  MagentaDark: {
    mode: "dark",
    primary: {
      main: "#EC407A",
      light: "#ef6694",
      dark: "#a52c55",
    },
  },
  Red: {
    mode: "light",
    primary: {
      main: "#D32F2F",
      light: "#db5858",
      dark: "#932020",
    },
  },
  RedDark: {
    mode: "dark",
    primary: {
      main: "#EF5350",
      light: "#f27573",
      dark: "#a73a38",
    },
  },
  Orange: {
    mode: "light",
    primary: {
      main: "#F57C00",
      light: "#f79633",
      dark: "#ab5600",
    },
  },
  OrangeDark: {
    mode: "dark",
    primary: {
      main: "#FFA726",
      light: "#ffb851",
      dark: "#b2741a",
    },
  },
  Yellow: {
    mode: "light",
    primary: {
      main: "#FFA000",
      light: "#ffb333",
      dark: "#b27000",
    },
  },
  YellowDark: {
    mode: "dark",
    primary: {
      main: "#FFCA28",
      light: "#ffd453",
      dark: "#E87040",
    },
  },
  Green: {
    mode: "light",
    primary: {
      main: "#689F38",
      light: "#86b25f",
      dark: "#486f27",
    },
  },
  GreenDark: {
    mode: "dark",
    primary: {
      main: "#9CCC65",
      light: "#afd683",
      dark: "#6d8e46",
    },
  },
} as const;
