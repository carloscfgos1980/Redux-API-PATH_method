import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import paintingsData from '../components/paintingsData'
const API_URL ='http://localhost:8000/paintingsData';

export const getDataAsync = createAsyncThunk(
    'gallery/getDataAsync',
    async () => {
        const response = await fetch(API_URL);
        if (response.ok) {
            const dataPaintings = await response.json();
            return { dataPaintings }
        }
    }
);

export const paintReservedAsync = createAsyncThunk(
    'gallery/paintReservedAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/paintingsData/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reserved: true }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    }
);
export const paintNotReservedAsync = createAsyncThunk(
    'gallery/paintNotReservedAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/paintingsData/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reserved: false }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    }
);

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        mockData:[],
        paintingsData: [],
        addedPainting: [],
        alreadyAdded: false,
        clientAllData: [],
        fanAllData: [],
        isLoading:true,
    },
    reducers: {
        addPainting: (state, action) => {
            console.log("action", action.payload)
            const title = action.payload.title;
            if (
                state.addedPainting
                    .map((item) => item.title)
                    .includes(title)
            ) {
                state.alreadyAdded = true;
                //state.addedPainting = state.addedPainting;

            } else {
                let newPaintCart =
                {
                    id: action.payload.id,
                    title,
                    tech: action.payload.tech,
                    price: action.payload.price,
                    img: action.payload.img
                };
                let existingtItems = state.paintingsData.map(paint => {
                    if (paint.title === title) {
                        paint.reserved = true;
                    }
                    //console.log("Reserved", paint.reserved)
                    return paint;
                });
                state.paintingsData = existingtItems;
                state.addedPainting.push(newPaintCart);

            }
        },
        removePainting: (state, action) => {
            const title = action.payload.title;
            //console.log("title to remove", title);
            state.addedPainting = state.addedPainting.filter(paint => paint.title !== title);
            if (
                state.paintingsData
                    .map((item) => item.title)
                    .includes(title)
            ) {
                let existingtItems = state.paintingsData.map(paint => {
                    if (paint.title === title) {
                        paint.reserved = false;
                    }
                    console.log("Reserved", paint.reserved)
                    return paint;
                });
                state.paintingsData = existingtItems;
            }
        },
        clientData: (state, action) => {
            //console.log("client", action.payload)
            state.clientAllData = action.payload;
        },
        switchFalse: (state) => {
            state.alreadyAdded = false;
        },
        fansData: (state, action) => {
            console.log("fan", action.payload)
            state.fanAllData = action.payload;
        },
        resetAddedPainting: (state) => {
            state.addedPainting = [];
        }
    },
    extraReducers: {
        [getDataAsync.pending]: (state, action) => {
            console.log('fetching data...');
            state.isLoading=true;
        },
        [getDataAsync.fulfilled]: (state, action) => {
            console.log('Data fetched successfully!')
            console.log(action.payload.dataPaintings)
            state.paintingsData=action.payload.dataPaintings;
            state.isLoading=false;
            return action.payloads;
        },
        [paintReservedAsync.fulfilled]: (state, action) => {
            let updatedDataPaintings = state.paintingsData.map(painting => {
                if (painting.id === action.payload.id) {
                    painting.reserved = true;
                }
                return painting;
            });
            state.paintingsData = updatedDataPaintings;
        },
        [paintNotReservedAsync.fulfilled]: (state, action) => {
            let updatedDataPaintings = state.paintingsData.map(painting => {
                if (painting.id === action.payload.id) {
                    painting.reserved = false;
                }
                return painting;
            });
            state.paintingsData = updatedDataPaintings;
        },
    }
});


export const { addPainting, feedback, removePainting, clientData, switchFalse, fansData, resetAddedPainting, addPaint } = gallerySlice.actions;

export default gallerySlice.reducer;