import { useTheme } from '@emotion/react';
import { IllustrationProps } from '../../typings/illustration-panel-types';
import { IllustrationHeader } from '../illustration-header/illustration-header';
import { IllustrationWrapper } from '../illustration-wrapper/illustration-wrapper';

export const IllustrationSingle = (props: IllustrationProps) => {
  const theme = useTheme();

  return (
    <IllustrationWrapper
      single
      fullWidth={props.model.fullWidth}
      sx={{ boxShadow: theme.shadows[2] }}
    >
      <IllustrationHeader {...props} allowFocus={false} size="small" />
    </IllustrationWrapper>
  );
};
