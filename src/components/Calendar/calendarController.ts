import { useState, useEffect, useCallback } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns'

import { ValuesInReais } from './types'
import { valuesPerMonth } from './mock'

export const useCalendarController = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [valuesInReais, setValuesInReais] = useState<ValuesInReais>({})
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState<string | null>(null)

  const getValuesForMonth = useCallback((month: Date): ValuesInReais => {
    const monthString = format(month, 'MM')
    return valuesPerMonth[monthString] || {}
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const newValues: ValuesInReais = getValuesForMonth(selectedMonth)
      setValuesInReais(newValues)
    } catch (error) {
      throw new Error('Falha ao buscar da api')
    } finally {
      setLoading(false)
    }
  }, [getValuesForMonth, selectedMonth])

  const daysOfMonth: Date[] = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  })

  const openModal = (valueOfDay: number | undefined): void => {
    if (valueOfDay !== undefined) {
      setIsModalOpen(true)
      setItemSelected(`R$ ${valueOfDay}`)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const formatDate = (date: Date) => format(date, 'd')

  const firstDayOfMonth = new Date(daysOfMonth[0])
  const startingDay = firstDayOfMonth.getDay()

  const daysOfPreviousMonth = []
  const daysInPreviousMonth = startingDay === 0 ? 6 : startingDay - 1

  for (let i = 0; i < daysInPreviousMonth; i++) {
    const day = new Date(firstDayOfMonth)
    day.setDate(day.getDate() - (daysInPreviousMonth - i))
    daysOfPreviousMonth.push(day)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 0)

    return () => clearTimeout(timer)
  }, [fetchData, selectedMonth])

  return {
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
    firstDayOfMonth,
    startingDay,
    daysOfPreviousMonth,
  }
}

export default useCalendarController
