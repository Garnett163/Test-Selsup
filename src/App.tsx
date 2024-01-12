import React, { useState, useEffect } from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const initialModel = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
};

const initialParams: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (model) {
      setParamValues(model.paramValues);
    }
  }, [model]);

  const handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = paramValues.map(paramValue =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue,
    );

    setParamValues(updatedParamValues);
  };

  const getModel = (): Model => ({ paramValues });

  return (
    <div className="param-editor">
      {params.map(param => (
        <div className="param-editor__container" key={param.id}>
          <label className="param-editor__label">{param.name}</label>
          <input
            className="param-editor__input"
            type="text"
            value={paramValues.find(p => p.paramId === param.id)?.value || ''}
            onChange={e => handleParamChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <button className="param-editor__btn" onClick={() => setShowModel(!showModel)}>
        {showModel ? 'Скрыть данные' : 'Показать данные'}
      </button>
      {showModel && <p>{JSON.stringify(getModel(), null, 2)}</p>}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <>
      <div className="container">
        <ParamEditor params={initialParams} model={initialModel} />
      </div>
    </>
  );
};

export default App;
