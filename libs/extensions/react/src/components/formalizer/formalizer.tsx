import { ReactNode } from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { FormalizerPayload } from '../../typings';
import { CreateChild } from '../create-child/create-child';

type FormalizerProps = {
  children?: ReactNode;
  auto?: boolean;
  formalizer: FormalizerPayload;
  modelId?: string;
};

export const Formalizer = ({
  children,
  formalizer,
  modelId,
  auto,
}: FormalizerProps) => {
  const handlers = {
    handleChange: formalizer.handleChange,
    handleBlur: formalizer.handleBlur,
    handleSubmit: formalizer.handleSubmit,
  };

  const model = modelId
    ? formalizer.formalizer?.getModel(modelId)
    : formalizer.formalizer?.getRootModel();

  return (
    <FormalizerContext.Provider
      value={{
        ...handlers,
        formalizer: formalizer.formalizer,
        framework: formalizer.framework,
      }}
    >
      {auto && model ? <CreateChild model={model} /> : children}
    </FormalizerContext.Provider>
  );
};
