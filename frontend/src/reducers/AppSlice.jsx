import { createSlice } from '@reduxjs/toolkit'

export const chartsSlice = createSlice({
    name: 'charts',
    initialState: {
        data: {
            'bar': [
                ["Location", "Cafés", "Employees"],
                ["North", 0, 0],
                ["East", 0, 0],
                ["South", 0, 0],
                ["West", 0, 0]],
        }

    },
    reducers: {
        get: (state, action) => {
            let barData = action.payload
            barData.bar[1][1]=Number(barData.bar[1][1])
            barData.bar[1][2]=Number(barData.bar[1][2])
            barData.bar[2][1]=Number(barData.bar[2][1])
            barData.bar[2][2]=Number(barData.bar[2][2])
            barData.bar[3][1]=Number(barData.bar[3][1])
            barData.bar[3][2]=Number(barData.bar[3][2])
            barData.bar[4][1]=Number(barData.bar[4][1])
            barData.bar[4][2]=Number(barData.bar[4][2])
            state.data=barData
        }
    }
})

export const { get } = chartsSlice.actions
export default chartsSlice.reducer