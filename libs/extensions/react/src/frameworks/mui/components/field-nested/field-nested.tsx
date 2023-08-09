import { HTMLMotionProps, Variants } from 'framer-motion';
import { CSSProperties, ReactNode, useState } from 'react';
import { Field, FieldProps } from '../field/field';
import { Header } from '../header/header';
import cx from 'classnames';
import * as Styled from './styled';
import { SxProps } from '@mui/material';
import { FormalizedModel } from '@formalizer/core';

const collapseVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1 },
};

type FieldNestedProps = {
  ContentProps?: HTMLMotionProps<'div'>;
  children?: (overrides: Partial<FormalizedModel>) => ReactNode;
} & Omit<FieldProps, 'children'>;

export const FieldNested = ({ model, children, ContentProps = {}, ...props }: FieldNestedProps) => {
  const { collapsible, collapsed: _collapsed = false, direction, layoutOnly } = model;

  const [collapsed, setCollapsed] = useState(_collapsed);

  const handleCollapseToggle = () => {
    setCollapsed((state) => !state);
  };

  let style: CSSProperties = {};
  let sx: SxProps = {};
  let isHorizontal = false;

  if (direction === 'horizontal') {
    isHorizontal = true;

    style = {
      display: 'inline-flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      width: '100%',
      marginBottom: '-16px',
    };
  }

  if (layoutOnly) {
    sx = { mt: 0, mb: 0 };
  } else {
    sx = { mt: 2.5, mb: 2.5 };
  }

  const contentCx = cx('field__content', {
    [`field__content--${direction}`]: direction !== undefined,
  });

  return (
    <Field model={model} sx={sx} isHorizontal={isHorizontal} {...props}>
      {(partialProps) => {
        return (
          <>
            <Header
              size={props.size}
              collapsed={collapsed}
              model={model}
              onCollapseToggle={handleCollapseToggle}
            />
            {collapsible ? (
              <Styled.MotionDiv
                variants={collapseVariants}
                animate={collapsed ? 'collapsed' : 'expanded'}
                className={contentCx}
                {...ContentProps}
                style={{ ...style, ...(ContentProps.style || {}) }}
              >
                {children?.(partialProps)}
              </Styled.MotionDiv>
            ) : (
              <Styled.MotionDiv
                className={contentCx}
                {...ContentProps}
                {...ContentProps}
                style={{ ...style, ...(ContentProps.style || {}) }}
              >
                {children?.(partialProps)}
              </Styled.MotionDiv>
            )}
          </>
        );
      }}
    </Field>
  );
};
