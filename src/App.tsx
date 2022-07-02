import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Home from './page/Home'
import ExampleChart from './page/ExampleChart'

const font = `"Source Code Pro", "Arial", "Roboto"`

const theme = createTheme({
    typography: {
        fontFamily: font,
    },
    palette: {
        background: {
            default: "#f5f5f5"
        }
    }
})


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/example' element={<ExampleChart />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
