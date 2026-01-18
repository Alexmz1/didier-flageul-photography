'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]
const DAYS = ['L', 'Ma', 'Me', 'J', 'V', 'S', 'D']

export default function CalendarPicker({ 
  value, 
  onChange, 
  placeholder = "Choisir une date",
  minDate,
  className = "" 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [selectedDate, setSelectedDate] = useState(() => {
    if (value) {
      const [year, month, day] = value.split('-').map(Number)
      return new Date(year, month - 1, day)
    }
    return null
  })
  const [isClient, setIsClient] = useState(false)
  const calendarRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
    setCurrentMonth(new Date())
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split('-').map(Number)
      setSelectedDate(new Date(year, month - 1, day))
    }
  }, [value])

  const getDaysInMonth = (date) => {
    if (!date || !isClient) return []
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    let firstDayOfWeek = firstDay.getDay()
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    const days = []
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      })
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const today = new Date()
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected
      })
    }
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      })
    }
    return days
  }

  const handleDateSelect = (date) => {
    if (minDate && date < new Date(minDate)) return
    setSelectedDate(date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    onChange(`${year}-${month}-${day}`)
    setIsOpen(false)
  }

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const formatDisplayDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const isDateDisabled = (date) => {
    if (!isClient) return true
    if (minDate) {
      return date < new Date(minDate)
    }
    return false
  }

  if (!isClient || !currentMonth) {
    return (
      <div className="relative">
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          value=""
          onClick={() => {}}
          className="input input-bordered w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    )
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="relative" ref={calendarRef}>
      <input
        type="text"
        readOnly
        placeholder={placeholder}
        value={selectedDate ? formatDisplayDate(selectedDate) : ''}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 ${className}`}
      />
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 shadow-lg rounded-lg p-4 min-w-80">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mois précédent"
            >
              <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
            </button>
            <h3 className="text-lg font-medium text-gray-900">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mois suivant"
            >
              <ChevronRightIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isDisabled = isDateDisabled(day.date) || !day.isCurrentMonth
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isDisabled && handleDateSelect(day.date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded-lg transition-all duration-200 min-h-10
                    ${day.isCurrentMonth 
                      ? 'text-gray-900 hover:bg-gray-100' 
                      : 'text-gray-300'
                    }
                    ${day.isSelected 
                      ? 'bg-blue-600 text-white font-medium hover:bg-blue-700' 
                      : ''
                    }
                    ${day.isToday && !day.isSelected 
                      ? 'bg-gray-100 font-medium ring-1 ring-gray-300' 
                      : ''
                    }
                    ${isDisabled 
                      ? 'cursor-not-allowed opacity-40' 
                      : 'cursor-pointer'
                    }
                  `}
                  style={day.isSelected ? { backgroundColor: '#276f88' } : {}}
                >
                  {day.date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
