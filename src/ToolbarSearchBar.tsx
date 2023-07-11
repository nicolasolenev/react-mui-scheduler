import React, { FC, JSX, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { format, parse } from "date-fns";
import { Event } from "./types";
import DateFnsLocaleContext from "./locales/dateFnsContext";

const StyledAutoComplete = styled(Autocomplete<Event>)(({ theme }) => ({
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
})) as typeof Autocomplete<Event>;

interface ToolbarSearchBarProps {
  events: Event[];
  onInputChange: (value: string) => void;
}

const ToolbarSearchBar: FC<ToolbarSearchBarProps> = ({ events, onInputChange }): JSX.Element => {
  const { t } = useTranslation(["common"]);
  const [value, setValue] = useState<Event | null>();
  const [inputValue, setInputValue] = useState<string>("");
  const dateFnsLocale = useContext(DateFnsLocaleContext);

  const handleOnChange = (event: React.SyntheticEvent, value: Event | null): void => {
    setValue(value);
    if (onInputChange) onInputChange(`${ value?.groupLabel || "" } | (${ value?.startHour || "" } - ${ value?.endHour || "" })`);
  };

  return (
    <StyledAutoComplete
      value={ value }
      id="scheduler-autocomplete"
      inputValue={ inputValue }
      sx={ { mb: 0, display: "inline-flex" } }
      onChange={ handleOnChange }
      options={ events }
      groupBy={ (option: Event) => option ? option?.groupLabel : "" }
      getOptionLabel={ (option: Event): string => (
        option ?
          `${ option.groupLabel || "" } | ${ option.date } | (${ option.startHour || "" } - ${ option.endHour || "" })` : ""
      ) }
      isOptionEqualToValue={ (option: Event, value: Event): boolean => option.id === value.id }
      onInputChange={ (event, newInputValue) => {
        setInputValue(newInputValue);
        onInputChange(newInputValue);
      } }
      renderOption={ (props, option: Event) => (
        <Box component="li" sx={ { fontSize: 12 } } { ...props }>
          { `${ format(parse(option?.date, "yyyy-MM-dd", new Date()), "dd-MMMM-yyyy", { locale: dateFnsLocale }) } (${ option?.startHour || "" } - ${ option?.endHour || "" })` }
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
