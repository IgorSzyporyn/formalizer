import { ReactNode } from 'react';
import cx from 'classnames';
import { FormalizerComponentProps } from '../../types';

type FieldWrapperProps = FormalizerComponentProps & {
  children?: ReactNode;
};

export const FieldWrapper = ({ children, model }: FieldWrapperProps) => {
  const classTypeName = `formalizer-${model?.type}`;
  const modelInline = model?.inline;

  const className = cx(`formalizer-field ${classTypeName}`, {
    'formalizer-field--inline': modelInline,
    'formalizer-field--block': !modelInline,
  });

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: modelInline ? 'row' : 'column',
      }}
    >
      {children}
    </div>
  );
};
