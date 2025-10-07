import { useState, useEffect } from 'react';
import { Drawnix } from '@drawnix/drawnix';
import { PlaitBoard, PlaitElement, PlaitTheme, Viewport } from '@plait/core';
import portfolioData from './portfolioData.json';

type AppValue = {
  children: PlaitElement[];
  viewport?: Viewport;
  theme?: PlaitTheme;
};

export function App() {
  const [value, setValue] = useState<AppValue>({ children: [] });

  const [tutorial, setTutorial] = useState(false);

  useEffect(() => {
    if (
      portfolioData.type === 'drawnix' &&
      Array.isArray(portfolioData.elements)
    ) {
      setValue({
        children: portfolioData.elements,
        viewport: portfolioData.viewport,
      });
      if (portfolioData.elements.length === 0) {
        setTutorial(true);
      }
    } else {
      setTutorial(true);
    }
  }, []);
  return (
    <Drawnix
      value={value.children}
      viewport={value.viewport}
      theme={value.theme}
      onChange={(value) => {
        const newValue = value as AppValue;
        setValue(newValue);
        if (newValue.children && newValue.children.length > 0) {
          setTutorial(false);
        }
      }}
      tutorial={tutorial}
      afterInit={(board) => {
        console.log('board initialized');
        /*
        console.log(
          `add __drawnix__web__debug_log to window, so you can call add log anywhere, like: window.__drawnix__web__console('some thing')`
        );
        (window as any)['__drawnix__web__console'] = (value: string) => {
          addDebugLog(board, value);
        };
        */
      }}
    ></Drawnix>
  );
}

const addDebugLog = (board: PlaitBoard, value: string) => {
  const container = PlaitBoard.getBoardContainer(board).closest(
    '.drawnix'
  ) as HTMLElement;
  let consoleContainer = container.querySelector('.drawnix-console');
  if (!consoleContainer) {
    consoleContainer = document.createElement('div');
    consoleContainer.classList.add('drawnix-console');
    container.append(consoleContainer);
  }
  const div = document.createElement('div');
  div.innerHTML = value;
  consoleContainer.append(div);
};

export default App;
