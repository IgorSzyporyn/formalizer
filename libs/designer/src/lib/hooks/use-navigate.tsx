import { useContext, useEffect, useRef } from 'react';
import { UiContext, UiContextValueSafe } from '../context/designer-context';
import { useNavigate as _useNavigate } from 'react-router-dom';

type UseNavigateType = Omit<UiContextValueSafe, 'utilitiesWidth' | 'utilitiesMinWidth'>;

export const useNavigate = () => {
  const {
    updateUi,
    utilitiesWidth: _b,
    utilitiesMinWidth: _c,
    ...uiContext
  } = useContext(UiContext);
  const navigate = _useNavigate();
  const uiContextHistory = useRef<UseNavigateType[]>([]);
  const addToHistory = useRef((value: UiContextValueSafe) => {
    uiContextHistory.current.push(value);
  });

  const historyBack = () => {
    const history = uiContextHistory.current;
    const lastHistory = history[history.length - 1];

    updateUi(lastHistory);
  };

  useEffect(() => {
    uiContextHistory.current.push(uiContext);

    // Add listener
  }, [uiContext]);

  return addToHistory.current;
};
