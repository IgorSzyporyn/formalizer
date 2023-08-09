import { CreateChildren } from '../../../../components/create-children/create-children';
import { FieldComponentProps } from '../../../../typings';
import { FieldNested } from '../../components/field-nested/field-nested';

export const GroupField = ({ model }: FieldComponentProps) => {
  return (
    <FieldNested model={model}>
      {(overrides) => {
        return <CreateChildren model={model} overrides={overrides} />;
      }}
    </FieldNested>
  );
};
