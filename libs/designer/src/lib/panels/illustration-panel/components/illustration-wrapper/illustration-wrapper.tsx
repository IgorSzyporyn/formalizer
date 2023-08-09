import { Box, BoxProps } from '@mui/material';
import * as Styled from './styled';
import { useTheme } from '@emotion/react';

type IllustrationWrapperProps = {
  fullWidth?: boolean;
  single?: boolean;
  isRoot?: boolean;
} & BoxProps;

export const IllustrationWrapper = ({
  fullWidth,
  single,
  isRoot,
  ...props
}: IllustrationWrapperProps) => {
  const theme = useTheme();

  let backgroundColor = single ? theme.palette.neutral.dark : theme.palette.primary.dark;

  if (isRoot) {
    backgroundColor = theme.palette.secondary.dark;
  }

  return (
    <Box>
      <Box sx={{ display: fullWidth ? 'block' : 'inline-flex', pr: 1 }}>
        <Styled.Wrapper
          {...props}
          sx={{
            mt: 2,
            mb: 2,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            borderRadius: `${theme.shape.borderRadius}px`,
            backgroundImage: 'linear-gradient(90deg, rgb(38, 38, 38) 0%, rgba(33,33,33,1) 100%)',
            overflow: 'hidden',
            ...(props.sx || {}),
          }}
          className="illustration-wrapper"
        >
          <Box
            sx={{ backgroundColor }}
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 8 }}
          />
          <Box sx={{ ml: 1, width: '100%' }}>{props.children}</Box>
        </Styled.Wrapper>
      </Box>
    </Box>
  );
};
