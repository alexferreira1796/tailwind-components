import {
  format,
} from 'date-fns';
import { isMobile } from 'react-device-detect';
import { ptBR } from 'date-fns/locale';

import { Modal } from "@/components/Modal";

import { capitalizeFirstLetter } from '@/utils/capitalizeFirsttLetter';

import { useCalendarController } from './calendarController';
import { daysOfWeek } from './mock';

import './styles.css';

export const Calendar = () => {
  const { 
    selectedMonth, 
    setSelectedMonth,
    valuesInReais,
    loading,
    isModalOpen,
    itemSelected,
    daysOfMonth,
    openModal,
    closeModal,
    formatDate } = useCalendarController();

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
              {capitalizeFirstLetter( format(new Date(selectedMonth.getFullYear(), index, 1), 'MMMM', { locale: ptBR }) )}
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
            {!loading && daysOfMonth.map((dayOfMonth: Date, idx: number) => {
              const valueOfDay = valuesInReais[formatDate(dayOfMonth)];
              return (
                <div
                  key={dayOfMonth.toString()}
                  onClick={() => openModal(valueOfDay)}
                  className={`${valueOfDay !== undefined && 'cursor-pointer'} text-center p-2 ${
                    valueOfDay !== undefined && isMobile ? 'bg-blue-500 text-white font-bold shadow-lg' : 'shadow-md'
                  }`}
                >
                  {formatDate(dayOfMonth)}
                  {!isMobile && valueOfDay !== undefined && (
                    <div className="mt-2 bg-blue-500 text-white cursor-pointer">
                      R$ {valueOfDay.toFixed(2)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {
            loading && <div className="c-loader"></div>
          }
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} id={itemSelected!} />
    </>
  );
};

export default Calendar;
