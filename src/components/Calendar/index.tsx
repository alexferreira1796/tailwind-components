import { format } from 'date-fns'
import { isMobile } from 'react-device-detect'
import { ptBR } from 'date-fns/locale'

import { Modal } from '@/components/Modal'
import { Loading } from '@/components/common/Loading'

import { capitalizeFirstLetter } from '@/utils/capitalizeFirsttLetter'
import { isValidDate } from '@/utils/isValidDate'

import { useCalendarController } from './calendarController'
import { daysOfWeek } from './mock'

import './styles.css'

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
    formatDate,
    daysOfPreviousMonth,
  } = useCalendarController()

  const emptyDays = daysOfPreviousMonth?.map((day, index) => (
    <div
      key={`empty-${index}`}
      className="text-center p-2 bg-gray-100"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span className="text-gray-300 font-bold">{formatDate(day)}</span>
    </div>
  ))

  return (
    <>
      <p className="m-2 p-2 font-bold">Calendar</p>
      <div className="flex flex-col shadow">
        <select
          className="m-2 p-2 shadow-md"
          value={format(selectedMonth, 'MM')}
          onChange={(event) => {
            const newMonth = new Date(selectedMonth)
            newMonth.setMonth(parseInt(event.target.value, 10) - 1)
            setSelectedMonth(newMonth)
          }}
        >
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={String(index + 1).padStart(2, '0')}>
              {capitalizeFirstLetter(
                format(
                  new Date(selectedMonth.getFullYear(), index, 1),
                  'MMMM',
                  { locale: ptBR },
                ),
              )}
            </option>
          ))}
        </select>
        <div className="overflow-x-auto">
          <div className="w-full min-w-screen-md grid grid-cols-7">
            {daysOfWeek?.map((day: string) => (
              <div key={day} className="text-center p-2 bg-gray-200 font-bold">
                {capitalizeFirstLetter(day)}
              </div>
            ))}
            {!loading &&
              [...emptyDays, ...daysOfMonth]?.map(
                (dayOfMonth: Date | unknown, index: number) => {
                  if (!isValidDate(dayOfMonth)) {
                    return emptyDays[index]
                  }

                  const valueOfDay = valuesInReais[formatDate(dayOfMonth)]
                  const cellClasses = `text-center p-2 ${
                    valueOfDay !== undefined
                      ? isMobile
                        ? 'bg-blue-500 text-white font-bold shadow-lg cursor-pointer'
                        : 'shadow-md cursor-pointer'
                      : 'shadow-md'
                  } h-20`
                  return (
                    <div
                      key={dayOfMonth.toString()}
                      onClick={() => openModal(valueOfDay)}
                      className={cellClasses}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {formatDate(dayOfMonth)}
                      {!isMobile && valueOfDay !== undefined && (
                        <div className="mt-2 bg-blue-500 text-white cursor-pointer">
                          R$ {valueOfDay.toFixed(2)}
                        </div>
                      )}
                    </div>
                  )
                },
              )}
          </div>
          {loading && <Loading />}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} id={itemSelected!} />
    </>
  )
}

export default Calendar
