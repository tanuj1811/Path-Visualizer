import React from 'react'
import { Grid, Navbar, Symbol } from './components'
import { GridProvider } from './context/gridContext'
const App = () => {
  return (
    <GridProvider>
      <Navbar />
      <Symbol />
      <Grid />
    </GridProvider>
  )
}

export default App