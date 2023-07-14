import { Box } from '@mui/material';
import * as Styled from './styled';

type BrandProps = {
  size?: 'small' | 'medium' | 'large';
};

export const Brand = ({ size = 'medium' }: BrandProps) => {
  return (
    <Styled.Wrapper>
      <Styled.LogoBox sx={{ mr: 1.5 }}>
        <Styled.Logo
          src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAiCAYAAABbXymAAAAAAXNSR0IArs4c6QAAAHJJREFUSEvtljEKgDAUQ5NruAie1uN5AsHFa3yppb+DSxD+lswhw6NJP9ctAoKuk2y2OCD56eBB1SjyfRnFRCGU7pflrWmFGBC7D/St2EW/g3MrjMIoPuWtq3TFTrRM3tDuigX9rlDl4PmDmHFuhVEMFA86dI9rH3tb2wAAAABJRU5ErkJggg==`}
          alt="Formalizer Logo"
        />
      </Styled.LogoBox>
      <Styled.Text>
        <Styled.Title>Formalizer</Styled.Title>
        <Styled.Subtitle>Automated form generation</Styled.Subtitle>
      </Styled.Text>
    </Styled.Wrapper>
  );
};
