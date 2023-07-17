import { ReactNode } from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { FormalizerPayload } from '../../typings';
import { CreateChild } from '../create-child/create-child';

type FormalizerProps = {
  children?: ReactNode;
  auto?: boolean;
  formalizer: FormalizerPayload;
};

export const Formalizer = ({ children, formalizer, auto }: FormalizerProps) => {
  const handlers = {
    handleChange: formalizer.handleChange,
    handleBlur: formalizer.handleBlur,
    handleSubmit: formalizer.handleSubmit,
  };

  const rootModel = formalizer.formalizer?.getRootModel();

  return (
    <FormalizerContext.Provider
      value={{
        ...handlers,
        formalizer: formalizer.formalizer,
        framework: formalizer.framework,
      }}
    >
      {auto && rootModel ? <CreateChild model={rootModel} /> : children}
    </FormalizerContext.Provider>
  );
};
