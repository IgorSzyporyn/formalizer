import { ReactNode, useRef } from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { FormalizerPayload } from '../../types';
import { CreateChild } from '../create-child/create-child';

type FormalizerProps = {
  formId?: string;
  children?: ReactNode;
  auto?: boolean;
  formalizer: FormalizerPayload;
};

export const Formalizer = ({
  children,
  formalizer,
  auto,
  formId,
}: FormalizerProps) => {
  const handlers = useRef({
    handleChange: formalizer.handleChange,
    handleBlur: formalizer.handleBlur,
    handleSubmit: formalizer.handleSubmit,
  });

  const id = formalizer.formalizer?.getModel(formId)?.id;

  return (
    <FormalizerContext.Provider
      value={{
        ...handlers.current,
        formalizer: formalizer.formalizer,
        framework: formalizer.framework,
      }}
    >
      {auto ? <CreateChild id={id} /> : children}
    </FormalizerContext.Provider>
  );
};
