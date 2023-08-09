import { CreateIllustrations } from '../../components/create-illustrations/create-illustrations';
import { IllustrationContainer } from '../../components/illustration-container/illustration-container';
import { IllustrationHeader } from '../../components/illustration-header/illustration-header';
import { IllustrationWrapper } from '../../components/illustration-wrapper/illustration-wrapper';
import { IllustrationProps } from '../../typings/illustration-panel-types';

export const GridIllustration = (props: IllustrationProps) => {
  const { model } = props;

  return (
    <IllustrationWrapper
      fullWidth={props.model.fullWidth}
      sx={{ border: '1px solid rgba(50, 50, 50, 0.7)' }}
    >
      <IllustrationHeader {...props} />
      <IllustrationContainer
        model={model}
        sx={{ '&  .illustration-wrapper': { margin: 0 }, mt: 2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr '.repeat(model.columns || 1),
          gridGap: 16,
        }}
      >
        <CreateIllustrations items={model?.items} />
      </IllustrationContainer>
    </IllustrationWrapper>
  );
};
