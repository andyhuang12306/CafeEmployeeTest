import { baseUrlCafe, baseUrlChart, baseUrlEmployee } from "./Consts"


export const getChartData=(dispatch, get)=>{
    fetch(baseUrlChart)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status == 0) {
                    dispatch(get(result.data))
                } else {
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}

export const getAllCafes = (dispatch, get) => {
    fetch(baseUrlCafe)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status == 0) {
                    dispatch(get(result.data))
                } else {
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}



export const submitCafe = (dispatch, cafe, navigate) => {
    fetch(baseUrlCafe, {
        method: "POST",
        headers: { "Content-Type": "application/json", "encoding": 'utf-8' },
        body: JSON.stringify(cafe)
    })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.status==0){
                    navigate(-1)
                }else{
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}

export const deleteCafe = (dispatch, get, cafe) => {
    fetch(baseUrlCafe+"?" + new URLSearchParams({ name: cafe.name, location: cafe.location }).toString(), {
        method: 'DELETE',
        body: cafe
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status == 0) {
                    getAllCafes(dispatch, get)
                } else {
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}

export const getAllEmployees = (dispatch, get) => {
    fetch(baseUrlEmployee)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status == 0) {
                    dispatch(get(result.data))
                } else {
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}


export const submitEmployee = (dispatch, employee, navigate) => {
    fetch(baseUrlEmployee, {
        method: "POST",
        headers: { "Content-Type": "application/json", "encoding": 'utf-8' },
        body: JSON.stringify(employee)
    })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.status==0){
                    navigate(-1)
                }else{
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}

export const deleteEmployee = (dispatch, get, employee) => {
    fetch(baseUrlEmployee+"?" + new URLSearchParams({ id: employee.id }).toString(), {
        method: 'DELETE',
        body: employee
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status == 0) {
                    getAllEmployees(dispatch, get)
                } else {
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}

export const getEmployeesByCafe = (dispatch, get, cafeName) => {
    fetch(baseUrlEmployee+"?" + new URLSearchParams({ cafeName: cafeName }).toString())
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status == 0) {
                    dispatch(get(result.data))
                } else {
                    alert(result.message)
                }
            },
            (error) => {
                alert(error)
            }
        )
}