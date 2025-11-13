import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
} from "@material-ui/core";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 400,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 400,
      boxSizing: "border-box",
      backgroundColor: "#fff",
      borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  drawerTitle: {
    fontSize: "1.25rem",
    fontWeight: 500,
  },
  closeButton: {
    color: theme.palette.primary.contrastText,
  },
  content: {
    padding: theme.spacing(2),
  },
  expansionPanel: {
    marginBottom: theme.spacing(1),
    "&:before": {
      display: "none",
    },
  },
  expansionPanelSummary: {
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
  expansionPanelDetails: {
    padding: theme.spacing(2),
    flexDirection: "column",
  },
  materialLink: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  materialIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1.2rem",
  },
  loadingText: {
    textAlign: "center",
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  errorText: {
    textAlign: "center",
    padding: theme.spacing(4),
    color: theme.palette.error.main,
  },
}));

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }
`;

const HomerLimud = ({ open, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      fetchStudyMaterials();
    }
  }, [open]);

  const fetchStudyMaterials = async () => {
    setLoading(true);
    setError(null);
    
          try {
      const response = await fetch(window.APP_CONFIG.STUDY_MATERIALS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMaterials(data || []);
    } catch (err) {
      setError(t("Dashboard.BroadcastArea.HomerLimud.errorLoading"));
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      className={classes.drawer}
    >
      <Box className={classes.drawerHeader}>
        <Typography className={classes.drawerTitle}>
          {t("Dashboard.BroadcastArea.HomerLimud.title")}
        </Typography>
        <IconButton
          onClick={onClose}
          className={classes.closeButton}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box className={classes.content}>
        {loading && (
          <Typography className={classes.loadingText}>
            {t("Dashboard.BroadcastArea.HomerLimud.loading")}
          </Typography>
        )}
        
        {error && (
          <Typography className={classes.errorText}>
            {error}
          </Typography>
        )}
        
        {!loading && materials.length === 0 && (
          <Typography className={classes.loadingText}>
            {t("Dashboard.BroadcastArea.HomerLimud.noMaterials")}
          </Typography>
        )}
        
        {!loading && materials.length > 0 && (
          <List>
            {materials.map((material, index) => (
              <ExpansionPanel key={index} className={classes.expansionPanel}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.expansionPanelSummary}
                >
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={material.Title}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  <div 
                    dangerouslySetInnerHTML={{ __html: material.Description }}
                    style={{ 
                      direction: 'rtl',
                      textAlign: 'right',
                      lineHeight: '1.6'
                    }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </List>
        )}
      </Box>
    </StyledDrawer>
  );
};

export default HomerLimud; 