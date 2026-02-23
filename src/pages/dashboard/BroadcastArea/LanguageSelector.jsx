import React from "react";
import {
  Menu,
  MenuItem,
  InputBase,
  Box,
} from "@material-ui/core";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

/* ---------- Styled Components ---------- */

const SearchContainer = styled(Box)`
  padding: ${(props) => props.theme.spacing(2)}px ${(props) => props.theme.spacing(2)}px ${(props) => props.theme.spacing(1)}px;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.palette.background.paper};
  z-index: 1;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.palette.action.hover};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  padding: ${(props) => props.theme.spacing(0.5)}px ${(props) => props.theme.spacing(1.5)}px;
`;

const SearchInput = styled(InputBase)`
  flex: 1;
  font-size: 14px;

  input {
    padding: ${(props) => props.theme.spacing(1)}px 0;

    &::placeholder {
      opacity: 0.6;
    }
  }
`;

const MenuItemsList = styled.div`
  max-height: 350px;
  overflow-y: auto;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.palette.action.hover};
    border-radius: 4px;

    &:hover {
      background: ${(props) => props.theme.palette.action.selected};
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;

  &.Mui-selected {
    background-color: ${(props) => props.theme.palette.action.selected};
    font-weight: 500;

    &:hover {
      background-color: ${(props) => props.theme.palette.action.selected};
    }
  }
`;

const NoResultsText = styled(Box)`
  padding: ${(props) => props.theme.spacing(3)}px ${(props) => props.theme.spacing(2)}px;
  text-align: center;
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 14px;
`;

/* ---------- Component ---------- */

/**
 * LanguageSelector Component
 *
 * A searchable language selection menu with auto-focus and filtering.
 *
 * @param {string} selectedLanguage - Currently selected language
 * @param {string[]} availableLanguages - Array of available language names
 * @param {function} onLanguageChange - Callback when language is selected
 * @param {HTMLElement|null} anchorEl - Anchor element for the menu
 * @param {function} onClose - Callback when menu should close
 */
const LanguageSelector = ({
  selectedLanguage,
  availableLanguages,
  onLanguageChange,
  anchorEl,
  onClose,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef(null);

  // Filter languages based on search query
  const filteredLanguages = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return availableLanguages;
    }
    const searchLower = searchQuery.toLowerCase();
    return availableLanguages.filter((lang) =>
      lang.toLowerCase().includes(searchLower)
    );
  }, [availableLanguages, searchQuery]);

  // Handle language selection
  const handleLanguageSelect = (langName) => {
    onLanguageChange(langName);
    handleClose();
  };

  // Handle menu close
  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  // Auto-focus search input when menu opens
  React.useEffect(() => {
    if (anchorEl && searchInputRef.current) {
      // Small delay to ensure menu is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [anchorEl]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      getContentAnchorEl={null}
      PaperProps={{
        style: {
          maxHeight: 'none',
          width: '180px',
          marginTop: '4px',
        },
      }}
      MenuListProps={{
        style: { padding: 0 },
      }}
    >
      {/* Search Input */}
      <SearchContainer onClick={(e) => e.stopPropagation()}>
        <SearchInputWrapper>
          <SearchIcon style={{ fontSize: 20, marginRight: 8, opacity: 0.6 }} />
          <SearchInput
            inputRef={searchInputRef}
            placeholder={t("Dashboard.BroadcastArea.searchLanguage") || "Search language..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              // Prevent menu from closing on Enter/Space
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
          />
        </SearchInputWrapper>
      </SearchContainer>

      {/* Language List */}
      <MenuItemsList>
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((langName) => (
            <StyledMenuItem
              key={langName}
              selected={langName === selectedLanguage}
              onClick={() => handleLanguageSelect(langName)}
            >
              <span>{langName}</span>
              {langName === selectedLanguage && (
                <CheckIcon style={{ fontSize: 18, marginLeft: 8 }} />
              )}
            </StyledMenuItem>
          ))
        ) : (
          <NoResultsText>
            {t("Dashboard.BroadcastArea.noLanguagesFound") || "No languages found"}
          </NoResultsText>
        )}
      </MenuItemsList>
    </Menu>
  );
};

export default LanguageSelector;
