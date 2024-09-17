import React, { useState } from "react";
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
  const [isCalculated, setIsCalculated] = useState(false);
  const [unit, setUnit] = useState("мг/м³");

  const calculateValues = () => {
    const uncertaintyB = absoluteError / Math.sqrt(3);
    setUncertaintyBType(uncertaintyB);

    const totalUncertainty = uncertaintyB;
    setUncertaintyTotal(totalUncertainty);

    const expandedUncertainty = totalUncertainty * 2;
    setUncertaintyExpanded(expandedUncertainty);

    const result = `(${measurementResult.toFixed(
      capacity
    )} ± ${expandedUncertainty.toFixed(capacity)}) ${unit}; k = 2; P = 0,95.`;

    setUncertaintyResult(result);
    setIsCalculated(true);
  };

  const saveValues = () => {
    const savedData = {
      absoluteError,
      measurementResult,
      uncertaintyBType,
      uncertaintyTotal,
      uncertaintyExpanded,
      capacity,
      unit,
    };
    console.log("Данные сохранены:", savedData);
    alert("Данные успешно сохранены!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Расчёт К1 Прямое измерение, абсолютная погрешность
      </h3>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium">
            Абсолютная погрешность [Δ]:
          </label>
          <Field
            error={errors?.resultValue?.message}
            name="value3"
            type="number"
            step="any"
            register={register}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={absoluteError}
            onChange={(e) =>
              setAbsoluteError(parseFloat(e.target.value.replace(",", ".")))
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Результат измерений X:
          </label>
          <Field
            error={errors?.resultValue?.message}
            name="value2"
            type="number"
            step="any"
            register={register}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={measurementResult}
            onChange={(e) =>
              setMeasurementResult(parseFloat(e.target.value.replace(",", ".")))
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Разрядность:
          </label>
          <Field
            error={errors?.resultValue?.message}
            name="value1"
            type="number"
            step="any"
            register={register}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={capacity}
            onChange={(e) =>
              setCapacity(parseInt(e.target.value.replace(",", ".")))
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Единица измерения:
          </label>
          <select
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="мг/м³">Пыль (взвешенные вещества) мг/м³</option>
            <option value="мг/дм³">Пыль (взвешенные вещества) мг/дм³</option>
            <option value="л/мин">Скорость отбора л/мин</option>
          </select>
        </div>

        <button
          type="button"
          class="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full bg-sky-500 text-white hover:bg-sky-600"
          onClick={calculateValues}
        >
          Рассчитать
        </button>

        {isCalculated && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Неопределённость по типу В:
              </label>
              <Field
                error={errors?.resultValue?.message}
                name="uncertaintyBType"
                type="text"
                register={register}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={uncertaintyBType.toFixed(capacity)}
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Суммарная неопределённость:
              </label>
              <Field
                error={errors?.resultValue?.message}
                name="uncertaintyTotal"
                type="text"
                register={register}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={uncertaintyTotal.toFixed(capacity)}
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Расширенная неопределённость:
              </label>
              <Field
                error={errors?.resultValue?.message}
                name="uncertaintyExpanded"
                type="text"
                register={register}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={uncertaintyExpanded.toFixed(capacity)}
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Результат неопределённости:
              </label>
              <Field
                error={errors?.resultValue?.message}
                name="resultValue"
                register={register}
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={uncertaintyResult}
                readOnly
              />
            </div>

            <button class="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full bg-sky-500 text-white hover:bg-sky-600">
              Сохранить
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalcCountK1;
