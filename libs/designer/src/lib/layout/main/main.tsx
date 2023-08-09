import PersonIcon from '@mui/icons-material/Person';
import { Box, Button } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import { useContext } from 'react';
import { BrandLogo } from '../../components/brand-logo/brand-logo';
import { UiContext, defaultUiContext } from '../../context/designer-context';
import { Canvas } from '../canvas/canvas';
import * as Styled from './styled';

const headerVariants: Variants = {
  expanded: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  collapsed: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const contentVariants: Variants = {
  expanded: {
    y: 96,
    transition: { duration: 0.3 },
  },
  collapsed: {
    y: 16,
    transition: { duration: 0.4 },
  },
};

export const Main = () => {
  const { canvasCollapsed } = useContext(UiContext);

  return (
    <>
      <BrandLogo style={{ position: 'absolute', top: 32, left: 44, zIndex: 900 }} />
      <motion.div
        style={{ height: '100%', position: 'relative' }}
        initial={defaultUiContext.canvasCollapsed ? 'collapsed' : 'expanded'}
        animate={canvasCollapsed ? 'collapsed' : 'expanded'}
      >
        <Styled.Header style={{ left: 64, right: 20, top: 8 }} variants={headerVariants}>
          <Styled.Text>
            <Styled.Title>Formalizer</Styled.Title>
            <Styled.Subtitle>Automated form generation</Styled.Subtitle>
          </Styled.Text>
          <Box>
            <Button color="neutral" variant="text" startIcon={<PersonIcon />} size="small">
              Profile
            </Button>
          </Box>
        </Styled.Header>
        <Styled.Content variants={contentVariants}>
          <Canvas />
        </Styled.Content>
      </motion.div>
    </>
  );
};
