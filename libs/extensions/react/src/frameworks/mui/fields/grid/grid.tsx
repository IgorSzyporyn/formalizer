import { CreateChildren } from '../../../../components/create-children/create-children';
import { FieldComponentProps } from '../../../../typings';
import { CollapsibleField } from '../../components/collapsible-field/collapsible-field';
import * as Styled from './styled';

export const GridField = ({ model }: FieldComponentProps) => {
  const { columns = 2 } = model;

  return (
    <CollapsibleField model={model}>
      <Styled.Content columns={columns}>
        <CreateChildren model={model} />
      </Styled.Content>
    </CollapsibleField>
  );
};
