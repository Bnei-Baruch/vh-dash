export const setStatusColor = (value) => {
  switch (value) {
    case "active":
      return "#9CCB3B";
    case "hold":
    case "late":
      return "#FF9800";
    case "nonExistant":
      return "#D32F2F";
    default:
      return "#d3d3d3";
  }
};
