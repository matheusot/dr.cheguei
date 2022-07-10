import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarPicker, ptBR } from "@mui/x-date-pickers";
import ptBRLocale from "date-fns/locale/pt-BR";
import type from "@mui/x-date-pickers/themeAugmentation";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ReactElement, useState } from "react";

const theme = createTheme({
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          width: "100%",
          backgroundColor: "#F7F7F7",
          borderRadius: "15px",
          "& div[role=presentation]": {
            textTransform: "capitalize",
            color: "#BA2121",
            button: {
              color: "#BA2121",
            },
          },
          "& .MuiIconButton-edgeStart, & .MuiIconButton-edgeEnd": {
            color: "#BA2121",
          },
          "& > div:first-of-type": {
            "& > div:first-of-type": {
              marginRight: "unset",
            },
            display: "flex",
            justifyContent: "space-between",
          },
        },
        viewTransitionContainer: {
          "& > div > div:first-of-type": {
            span: {
              width: "calc(100vw / 7)",
              userSelect: "none"
            }
          },

          "& div[role=row]": {
            button: {
              backgroundColor: "transparent",
              color: "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-selected, & .Mui-selected:focus": {
              backgroundColor: "#BA2121",
              color: "#ffffff",
            },
            "& .Mui-selected:hover": {
              backgroundColor: "#ab1818",
            },
          },
          "& div[role=cell]": {
            width: "calc(100vw / 7)",
            display: "flex",
            justifyContent: "center",
            button: {
              "&:hover": {
                backgroundColor: "white",
                color: "rgba(0, 0, 0, 0.87)",
              },
            },
          },
        },
      },
    },
  },
});

interface CalendarProps {
  selectedDate: Date | unknown;
  setSelectedDate: Function;
}

export const DrChegueiCalendar = ({
  selectedDate,
  setSelectedDate
}: CalendarProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ptBRLocale}
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <CalendarPicker
          date={selectedDate}
          onChange={(newDate: any) => setSelectedDate(new Date(newDate))}
          showDaysOutsideCurrentMonth
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
