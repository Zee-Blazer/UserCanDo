import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import React from 'react';

interface FaqAccordionProps {
  question: string;
  answer: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ question, answer }) => {
  return (
    <Accordion
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        width: '100%',
        py: 0,
        px: 0,
        borderRadius: 'inherit',
        '&:before': { display: 'none' },
      }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#043A66' }} />}
        aria-controls="faq-content"
        id="faq-header"
        sx={{
          minHeight: 56,
          px: { xs: 4, md: 8 },
          py: 0,
        }}
      >
        <Typography sx={{ fontWeight: 600, color: '#043A66', fontSize: { xs: '1.1rem', md: '1.15rem' } }}>{question}</Typography>
      </AccordionSummary>
      <Divider sx={{ borderColor: '#e9ecef', mx: 0, width: '100%' }} />
      <AccordionDetails sx={{ px: { xs: 4, md: 8 }, pb: 3, pt: 3, color: '#043A66', fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
        <Typography component="div" sx={{ whiteSpace: 'pre-line' }}>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FaqAccordion; 