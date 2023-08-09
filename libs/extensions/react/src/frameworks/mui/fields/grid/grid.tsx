import { CreateChildren } from '../../../../components/create-children/create-children';
import { FieldComponentProps } from '../../../../typings';
import { FieldNested } from '../../components/field-nested/field-nested';

export const GridField = ({ model }: FieldComponentProps) => {
  const { columns = 2 } = model;

  return (
    <FieldNested
      model={model}
      ContentProps={{ style: { display: 'grid', gridTemplateColumns: '1fr '.repeat(columns) } }}
    >
      {(overrides) => {
        return <CreateChildren model={model} overrides={overrides} />;
      }}
    </FieldNested>
  );
};
