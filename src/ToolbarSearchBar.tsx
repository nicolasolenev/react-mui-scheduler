import React, { FC, JSX, useState } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { format, parse } from "date-fns";

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "94%",
  display: "inline-flex",
  margin: theme.spacing(.5, 1.5),
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "27ch",
  },
  [theme.breakpoints.up("lg")]: {
    width: "27ch",
  },
})) as typeof Autocomplete;

interface ToolbarSearchBarProps {
  events: any[];
  onInputChange: (value: any) => void;
}

const ToolbarSearchBar: FC<ToolbarSearchBarProps> = ({ events, onInputChange }): JSX.Element => {
  const { t } = useTranslation(["common"]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (event: React.SyntheticEvent, newValue: any): void => {
    setValue(newValue);
    if (onInputChange) onInputChange(newValue);
  };

  return (
    <StyledAutoComplete
      value={ value }
      id="scheduler-autocomplete"
      inputValue={ inputValue }
      sx={ { mb: 0, display: "inline-flex" } }
      onChange={ handleOnChange }
      options={ events?.sort((a, b) => -b.groupLabel.localeCompare(a.groupLabel)) }
      groupBy={ (option: any) => option ? option?.groupLabel : null }
      getOptionLabel={ (option) => (
        option ?
          `${ option.groupLabel || "" } | (${ option.startHour || "" } - ${ option.endHour || "" })` : ""
      ) }
      isOptionEqualToValue={ (option, value) => option.id === value.id }
      onInputChange={ (event, newInputValue) => {
        setInputValue(newInputValue);
        onInputChange(newInputValue);
      } }
      renderOption={ (props, option) => (
        <Box component="li" sx={ { fontSize: 12 } } { ...props }>
          { format(
            parse(option?.date, "yyyy-MM-dd", new Date()),
            "dd-MMMM-yyyy",
          ) }
          ({ option?.startHour || "" } - { option?.endHour || "" })
        </Box>
      ) }
      renderInput={ (params) => (
        <TextField
          { ...params }
          size="small"
          label={ t("search") }
          InputProps={ { ...params.InputProps } }
        />
      ) }
    />
  );
};

export default ToolbarSearchBar;
