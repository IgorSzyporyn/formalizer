import { IllustrationProps } from '../../typings/illustration-panel-types';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';
import { IllustrationContainer } from '../illustration-container/illustration-container';
import { IllustrationHeader } from '../illustration-header/illustration-header';
import { IllustrationWrapper } from '../illustration-wrapper/illustration-wrapper';

export const IllustrationNested = (props: IllustrationProps) => {
  return (
    <IllustrationWrapper
      fullWidth={props.model.fullWidth}
      isRoot={props.isRoot}
      sx={{ border: '1px solid rgba(50, 50, 50, 0.7)' }}
    >
      <IllustrationHeader {...props} />
      <IllustrationContainer model={props.model}>
        <CreateIllustrations items={props.model.items} />
      </IllustrationContainer>
    </IllustrationWrapper>
  );
};
