import { blue, green, grey, indigo, red, teal } from "@material-ui/core/colors";

const blueVariant = {
  name: "Blue",
  palette: {
    primary: {
      main: blue[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: blue[600],
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: blue[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: "#213e5f",
    header: {
      color: "#FFF",
      background: "#213e5f",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: "#213e5f",
      online: {
        background: "#FFF",
      },
    },
    category: {
      fontWeight: 400,
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
  body: {
    background: "#F7F9FC",
  },
};

const greenVariant = {
  name: "Green",
  palette: {
    primary: {
      main: green[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: green[500],
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: green[500],
    },
  },
  sidebar: {
    color: "#FFF",
    background: "#213e5f",
    header: {
      color: "#FFF",
      background: "#213e5f",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: "#213e5f",
      online: {
        background: "#FFF",
      },
    },
    category: {
      fontWeight: 400,
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
  body: {
    background: "#F9F9FC",
  },
};

const indigoVariant = {
  name: "Indigo",
  palette: {
    primary: {
      main: indigo[600],
      contrastText: "#FFF",
    },
    secondary: {
      main: indigo[400],
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: indigo[500],
    },
  },
  sidebar: {
    color: "#FFF",
    background: "#213e5f",
    header: {
      color: "#FFF",
      background: "#213e5f",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: "#213e5f",
      online: {
        background: "#FFF",
      },
    },
    category: {
      fontWeight: 400,
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
  body: {
    background: "#F9F9FC",
  },
};

const tealVariant = {
  name: "Teal",
  palette: {
    primary: {
      main: teal[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: teal[600],
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: teal[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: "#213e5f",
    header: {
      color: "#FFF",
      background: "#213e5f",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: "#213e5f",
      online: {
        background: "#FFF",
      },
    },
    category: {
      fontWeight: 400,
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
  body: {
    background: "#F7F9FC",
  },
};

const lightVariant = {
  name: "Light",
  palette: {
    primary: {
      main: blue[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: blue[600],
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[200],
    background: blue[800],
    search: {
      color: grey[100],
    },
    indicator: {
      background: red[700],
    },
  },
  sidebar: {
    color: "#FFF",
    background: "#213e5f",
    header: {
      color: "#FFF",
      background: "#213e5f",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: "#213e5f",
      online: {
        background: green[500],
      },
    },
    category: {
      fontWeight: 600,
    },
    badge: {
      color: "#FFF",
      background: green[600],
    },
  },
  body: {
    background: "#F7F9FC",
  },
};

const darkVariant = {
  name: "Dark",
  palette: {
    primary: {
      main: blue[700],
      contrastText: "#FFF",
    },
    secondary: {
      main: blue[500],
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFFFFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: blue[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: "#213e5f",
    header: {
      color: "#FFF",
      background: "#213e5f",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: "#213e5f",
      online: {
        background: green[500],
      },
    },
    category: {
      fontWeight: 400,
    },
    badge: {
      color: "#FFF",
      background: blue[500],
    },
  },
  body: {
    background: "#F7F9FC",
  },
};

const variants = [
  darkVariant,
  lightVariant,
  blueVariant,
  greenVariant,
  indigoVariant,
  tealVariant,
];

export default variants;
