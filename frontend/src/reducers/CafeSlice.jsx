import { createSlice } from '@reduxjs/toolkit'

export const cafeSlice = createSlice({
    name: 'cafe',
    initialState: {
        cafeList: {
            rowData: [], colDefs: []
        },
        cafeSingle: {
            name: "",
            description: "",
            location: "",
            logoPath: "",
            logoStr: ""
        }

    },
    reducers: {
        get: (state, action) => {
            state.cafeList.rowData = action.payload
        },
        add: (state, action) => {
            state.cafeList.rowData = state.cafeList.rowData.concat(action.payload)
        },
        dlt: (state, action) => {
            state.cafeList.rowData = state.cafeList.rowData.filter(d => d.id != action.payload.id)
        },
        update: (state, action) => {
            state.cafeList.rowData = action.payload
        },
        getSingle: (state, action) => {
            state.cafeSingle = action.payload
        },
        setSingleName: (state, action) => {
            state.cafeSingle.name = action.payload
        },
        setSingleDescription: (state, action) => {
            state.cafeSingle.description = action.payload
        },
        setSingleLogo: (state, action) => {
            state.cafeSingle.logoPath = action.payload
        },
        setSingleLocation: (state, action) => {
            state.cafeSingle.location = action.payload
        }
    },
})

export const { get, add, dlt, update, getSingle, setSingleName, setSingleDescription, setSingleLogo, setSingleLocation } = cafeSlice.actions
export default cafeSlice.reducer