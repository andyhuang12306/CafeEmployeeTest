import App from './App.jsx'
import {
  Route,
  Navigate,
  Routes
} from "react-router-dom"
import Cafe from "./pages/Cafe.jsx"
import Employee from "./pages/Employee.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './Store.jsx'
import CafeDetail from './pages/CafeDetail.jsx'
import EmployeeDetail from './pages/EmployeeDetail.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/cafe/detail" element={<CafeDetail />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/detail" element={<EmployeeDetail />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
)