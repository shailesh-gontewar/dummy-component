import React, { useState } from "react"
import { Col, Row } from "reactstrap"

const MonthYearPicker = () => {
  const [selectedMonth, setSelectedMonth] = useState("")
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const handleMonthChange = event => {
    setSelectedMonth(event.target.value)
  }

  const years = () => {
    const currentYear = new Date().getFullYear()
    const yearsArray = []
    for (let i = currentYear - 0; i <= currentYear + 0; i++) {
      yearsArray.push(i.toString())
    }
    return yearsArray[0]
  }
  const [selectedYear, setSelectedYear] = useState(years)

  const handleYearChange = value => {
    if (value.length <= 4) {
      setSelectedYear(value)
    }
  }

  return (
    <Row>
      <Col>
        <h4 className="card-title me-4 text-start">Month</h4>
        <select
          value={selectedMonth}
          className="form-select"
          onChange={handleMonthChange}
        >
          <option value="" disabled style={{ fontWeight: "bold" }}>
            Select Month
          </option>
          {months.map(month => (
            <option key={month.value} value={month.value} className="text-dark">
              {month.label}
            </option>
          ))}
        </select>
      </Col>
      <Col>
        <h4 className="card-title me-4 text-start">Year</h4>
        <input
          className="form-control"
          value={selectedYear}
          onChange={e => handleYearChange(e.target.value)}
          type="number"
        />
        {/* <select
          value={selectedYear}
          className="form-select"
          onChange={handleYearChange}
        >
          <option value="" disabled style={{ fontWeight: "bold" }}>
            Select Year
          </option>
          {years().map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select> */}
      </Col>
    </Row>
  )
}

export default MonthYearPicker
