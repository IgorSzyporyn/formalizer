import * as Styled from './styled';

type BrandProps = {
  size?: 'small' | 'medium' | 'large';
};

export const Brand = ({ size = 'medium' }: BrandProps) => {
  return (
    <Styled.Wrapper>
      <Styled.LogoBox sx={{ mr: 1.5 }}>
        <Styled.Logo
          src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAH5JREFUWEdjZMAB7K3//8clhyx+8Cgj4/9rKkSpZdS6w4huJoYATMGoA0ZDYDQERkNgwEOAmFKQGmpwloT/DQyIK14vXGD8P5GBOLX5DMQXxaMOGA2B0RAYDYEBDwFqFLPEmIGzKH7GQFyrWIqBEacZow4YDYHREBgNgSERAgArh7QhceN8pwAAAABJRU5ErkJggg==`}
          alt="Formalizer Logo"
        />
      </Styled.LogoBox>
      <Styled.Text></Styled.Text>
    </Styled.Wrapper>
  );
};

// <Styled.Title>Formalizer</Styled.Title>
// <Styled.Subtitle>Automated form generation</Styled.Subtitle>
