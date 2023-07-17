import { MouseEvent, useContext } from 'react';
import { DesignerUiContext } from '../../designer-context';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CanvasMode } from '../../typings/designer-types';
import { Brand, PanelHeader } from '@formalizer/components';

export const Header = () => {
  const { updateUiContext, canvasMode } = useContext(DesignerUiContext);

  const handleChange = (
    _: MouseEvent<HTMLElement>,
    newCanvasMode: CanvasMode
  ) => {
    updateUiContext({ canvasMode: newCanvasMode });
  };

  return (
    <PanelHeader
      Info={<Brand />}
      Action={
        <ToggleButtonGroup
          exclusive
          color="primary"
          value={canvasMode}
          size="small"
          onChange={handleChange}
        >
          <ToggleButton value={CanvasMode.Example}>Example</ToggleButton>
          <ToggleButton value={CanvasMode.Illustration}>
            Illustration
          </ToggleButton>
        </ToggleButtonGroup>
      }
    />
  );
};
