import React, { useState, useEffect } from 'react';

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
  // colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>();

  useEffect(() => {
    setParamValues(
      params?.map(param => ({
        paramId: param.id,
        value: model.paramValues.find(value => value.paramId === param.id)?.value || '',
      })),
    );
  }, [params, model?.paramValues]);

  const handleParamChange = (paramId: number, value: string) => {
    setParamValues(prevParamValues =>
      prevParamValues?.map(paramValue => (paramValue.paramId === paramId ? { ...paramValue, value } : paramValue)),
    );
  };

  // const getModel = (): Model => {
  //   return {
  //     paramValues,
  //     colors: model.colors,  // замени на получение реальных цветов
  //   };
  // };

  return (
    <div>
      <h2>Редактирование модели</h2>
      {params ? (
        params?.map(param => (
          <div key={param.id}>
            <label htmlFor={`param-${param.id}`}>{param.name}:</label>
            <input
              type="text"
              id={`param-${param.id}`}
              value={paramValues?.find(p => p.paramId === param.id)?.value || ''}
              onChange={e => handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))
      ) : (
        <p>Что за нахуй</p>
      )}
      <button onClick={() => console.log()}>Получить модель</button>
    </div>
  );
};

export default ParamEditor;
