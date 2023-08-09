import {
  PanInfo,
  Variants,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useContext } from 'react';
import { UiContext } from '../../context/designer-context';
import * as Styled from './styled';

const utilitiesVariants: Variants = {
  utilitiesExpanded: {
    width: 400,
  },
  utilitiesCollapsed: {
    width: 44,
  },
};

export const Layout = () => {
  const { utilitiesMinWidth, utilitiesCollapsed, updateUi } = useContext(UiContext);
  const utilitiesAnimation = useAnimationControls();

  // A motion value for the handles x-axis offset
  const mvOffset = useMotionValue(0);
  // A motion value for the width of the panel, based on the offset value
  const mvWidth = useTransform(mvOffset, (v) => 44 - v);

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    //
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {};

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    //
  };

  return (
    <Styled.Wrapper>
      <Styled.Main>
        <Styled.Header>Styled. Content</Styled.Header>
        <Styled.Canvas>Canvas</Styled.Canvas>
      </Styled.Main>
      <Styled.Utility
        animate={utilitiesAnimation}
        style={{ width: mvWidth }}
        variants={utilitiesVariants}
      >
        <Styled.Slider
          drag="x"
          style={{ x: mvOffset }}
          dragConstraints={{ left: 44 - 600, right: 0 }}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragElastic={0.25}
          dragMomentum={false}
        />
        <Styled.Bar>==</Styled.Bar>
        <Styled.Content>kjlaksjd laksjdl lkjasdlkj laksjdlak lkjasldk lkajsd lkjasd</Styled.Content>
      </Styled.Utility>
    </Styled.Wrapper>
  );
};
