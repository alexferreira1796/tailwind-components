import { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { isMobile } from 'react-device-detect';
import { ptBR } from 'date-fns/locale';

import './styles.css';

interface ValuesInReais {
  [key: string]: number;
}

export const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [valuesInReais, setValuesInReais] = useState<ValuesInReais>({});

  const getValuesForMonth = (month: Date): ValuesInReais => {
    const monthString = format(month, 'MM');
    return valuesPerMonth[monthString] || {};
  };

  useEffect(() => {
    const newValues: ValuesInReais = getValuesForMonth(selectedMonth);
    setValuesInReais(newValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  const daysOfWeek: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const daysOfMonth: Date[] = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  });

  const formatDate = (date: Date) => format(date, 'd');

  const valuesPerMonth: Record<string, ValuesInReais> = {
    '01': { '2': 50.0, '17': 30.0, '20': 100.0 },
    '02': { '5': 80.0, '10': 40.0, '25': 120.0 },
    '03': { '1': 80.0, '11': 40.0, '19': 120.0 },
    '04': { '2': 80.0, '23': 40.0, '30': 120.0 },
    '05': { '5': 80.0, '20': 40.0, '12': 120.0 },
    '06': { '7': 80.0, '25': 40.0, '14': 120.0 },
    '07': { '10': 80.0, '22': 40.0, '04': 120.0 },
    '08': { '5': 80.0, '12': 40.0, '13': 120.0 },
    '09': { '12': 80.0, '15': 40.0, '06': 120.0 },
    '10': { '8': 80.0, '16': 40.0, '09': 120.0 },
    '11': { '14': 80.0, '22': 40.0, '10': 120.0 },
    '12': { '15': 80.0, '23': 40.0, '30': 120.0 },
  };

  return (
    <>
      <p className="m-2 p-2 font-bold">Calendar</p>
      <div className="flex flex-col shadow">
        <select
          className="m-2 p-2 shadow-md"
          value={format(selectedMonth, 'MM')}
          onChange={(event) => {
            const newMonth = new Date(selectedMonth);
            newMonth.setMonth(parseInt(event.target.value, 10) - 1);
            setSelectedMonth(newMonth);
          }}
        >
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={String(index + 1).padStart(2, '0')}>
              {format(new Date(selectedMonth.getFullYear(), index, 1), 'MMMM', { locale: ptBR }).toLocaleUpperCase()}
            </option>
          ))}
        </select>
        <div className="overflow-x-auto">
          <div className="w-full min-w-screen-md grid grid-cols-7">
            {daysOfWeek.map((day: string, index: number) => (
              <div key={day} className="text-center p-2 bg-gray-200 font-bold">
                {day}
              </div>
            ))}
            {daysOfMonth.map((dayOfMonth: Date, idx: number) => {
              const valueOfDay = valuesInReais[formatDate(dayOfMonth)];
              return (
                <div
                  key={dayOfMonth.toString()}
                  className={`text-center p-2 ${
                    valueOfDay !== undefined && isMobile ? 'bg-blue-500 text-white font-bold shadow-lg' : 'shadow-md'
                  }`}
                >
                  {formatDate(dayOfMonth)}
                  {!isMobile && valueOfDay !== undefined && (
                    <div className="mt-2 bg-blue-500 text-white">
                      R${valueOfDay.toFixed(2)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
