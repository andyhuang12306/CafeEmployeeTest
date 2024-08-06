

export const pagination = true
export const paginationPageSize = 5
export const baseUrlChart = "http://127.0.0.1:8000/charts"
export const baseUrlFileUpload = "http://127.0.0.1:8000/upload/file"
export const baseUrl = "http://127.0.0.1:8000/"
export const baseUrlCafe = "http://127.0.0.1:8000/cafes"
export const baseUrlEmployee = "http://127.0.0.1:8000/employees"

export const barOptions = {
  chart: {
    title: "OverView of Cafés and Employees",
    subtitle: "Locations, Cafés, and Employees RelationShip",
  },
  hAxis: {
    title: "Quantities",
    minValue: 0,
  },
  vAxis: {
    title: "Location",
  }
}