import React, { useState, useEffect } from "react";
import { useCalculator } from "./useCalculator";
import Field from "../../ui/Fields/Field";
import Loader from "../../ui/Loader";

const CalcCountK1 = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register } =
    useCalculator();

  const [absoluteError, setAbsoluteError] = useState(0);
  const [measurementResult, setMeasurementResult] = useState(0);
  const [uncertaintyBType, setUncertaintyBType] = useState(0);
  const [uncertaintyTotal, setUncertaintyTotal] = useState(0);
  const [uncertaintyExpanded, setUncertaintyExpanded] = useState(0);
  const [capacity, setCapacity] = useState(2);
  const [uncertaintyResult, setUncertaintyResult] = useState("");

  const calculateValues = () => {
    const uncertaintyB = absoluteError / Math.sqrt(3);
    setUncertaintyBType(uncertaintyB);

    const totalUncertainty = uncertaintyB;
    setUncertaintyTotal(totalUncertainty);

    const expandedUncertainty = totalUncertainty * 2;
    setUncertaintyExpanded(expandedUncertainty);

    const result = `(${measurementResult.toFixed(
      capacity
    )} ± ${expandedUncertainty.toFixed(capacity)}) единица; k = 2; P = 0,95.`;

    setUncertaintyResult(result);
  };

  useEffect(() => {
    calculateValues();
  }, [absoluteError, measurementResult, capacity]);

  const saveValues = () => {
    const savedData = {
      absoluteError,
      measurementResult,
      uncertaintyBType,
      uncertaintyTotal,
      uncertaintyExpanded,
      capacity,
    };
    console.log("Данные сохранены:", savedData);
    alert("Данные успешно сохранены!");
  };

  return (
    <div>
      <h3>Расчёт К1 Прямое измерение, абсолютная погрешность</h3>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label>Абсолютная погрешность [Δ]: </label>
          <input
            type="number"
            value={absoluteError}
            onChange={(e) => setAbsoluteError(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Результат измерений X: </label>
          <input
            type="number"
            value={measurementResult}
            onChange={(e) => setMeasurementResult(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Разрядность (capacity): </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label>Неопределённость по типу В: </label>
          <input
            type="number"
            value={uncertaintyBType.toFixed(capacity)}
            readOnly
          />
        </div>

        <div>
          <label>Суммарная неопределённость: </label>
          <input
            type="number"
            value={uncertaintyTotal.toFixed(capacity)}
            readOnly
          />
        </div>

        <div>
          <label>Расширенная неопределённость: </label>
          <input
            type="number"
            value={uncertaintyExpanded.toFixed(capacity)}
            readOnly
          />
        </div>

        <div>
          <label>Результат неопределённости: </label>
          <Field
            error={errors?.resultValue?.message}
            name="resultValue"
            register={register}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
            value={uncertaintyResult}
            readOnly
          />
        </div>

        <button>Сохранить</button>
      </form>
    </div>
  );
};

export default CalcCountK1;
