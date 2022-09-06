import React from 'react'
import { Footer, Grid, Navbar, NoticeBoard } from './components'
import { GridProvider } from './context/gridContext'
const App = () => {
  return (
    <GridProvider>
      <Navbar />
      <Grid />
      <NoticeBoard />
      <Footer />
    </GridProvider>
  )
}

export default App