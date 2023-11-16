import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SxProps, Theme } from "@mui/material";

interface IMyAccordionProps {
  label?: string;
  children?: JSX.Element;
  sx?: SxProps<Theme> | undefined;
}

export default function MyAccordion({
  label = "",
  children,
  sx,
}: IMyAccordionProps) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={sx}
        >
          <Typography>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
