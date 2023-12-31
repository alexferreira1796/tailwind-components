import { ValuesInReais } from './types'

export const daysOfWeek: string[] = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb',
]

export const valuesPerMonth: Record<string, ValuesInReais> = {
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
}
