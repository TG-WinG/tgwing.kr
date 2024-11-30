import { css } from '@emotion/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../css/datepicker.css'
import { Color } from '../palette'
import { getMonth, getYear } from 'date-fns'

import icon_left_arrow from '../assets/icons/icon_left_arrow.svg'
import icon_right_arrow from '../assets/icons/icon_right_arrow.svg'

interface CustomDatePickerProps {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  minDate?: Date
  maxDate?: Date
}

export const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  minDate,
  maxDate,
}: CustomDatePickerProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      minDate={minDate}
      maxDate={maxDate}
      placeholderText={new Date().toLocaleDateString('ko-KR').slice(0, -1)}
      css={css`
        ${CustomDatePickerStyle.datePickerInput}
        color: ${selectedDate ? Color.Black : Color.Gray400};
      `}
      dayClassName={(d) =>
        selectedDate && d.getDate() === selectedDate.getDate()
          ? 'selectedDay'
          : 'unselectedDay'
      }
      dateFormat={'yyyy. MM. dd'}
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
      shouldCloseOnSelect
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div css={customHeaderContainer}>
          <div>
            <select
              value={getYear(date)}
              css={year}
              onChange={({ target: { value } }) => changeYear(+value)}
            >
              {YEARS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <span css={month}>{MONTHS[getMonth(date)]}</span>
          <div css={monthButtonBox}>
            <button
              type='button'
              onClick={decreaseMonth}
              css={monthButton}
              disabled={prevMonthButtonDisabled}
            >
              <img src={icon_left_arrow} alt='<' />
            </button>
            <button
              type='button'
              onClick={increaseMonth}
              css={monthButton}
              disabled={nextMonthButtonDisabled}
            >
              <img src={icon_right_arrow} alt='>' />
            </button>
          </div>
        </div>
      )}
    />
  )
}

const customHeaderContainer = css`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  background-color: ${Color.Primary};
  padding: 2px 8px 2px 20px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`

const month = css`
  color: ${Color.White};
  font-size: 16px;
  font-weight: 100;
`

const year = css`
  background-color: ${Color.Primary};
  color: ${Color.White};
  border: none;
  font-size: 14px;
  font-weight: 400;
  padding-right: 5px;
  cursor: pointer;
`

const monthButtonBox = css`
  display: flex;
  gap: 5px;
`

const monthButton = css`
  width: 34px;
  height: 34px;
  padding: 5px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(${Color.White}, 0.08);
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }
`

const CustomDatePickerStyle = {
  datePickerInput: css`
    display: flex;
    align-items: center;
    padding: 9px 0;
    border: 1px solid #5e5d5d;
    border-radius: 4px;
    margin: 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
    cursor: pointer;
  `,
}

const YEARS = Array.from(
  { length: getYear(new Date()) + 1 - 2023 },
  (_, i) => getYear(new Date()) - i
)
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
