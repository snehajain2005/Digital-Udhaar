import { createContext, useContext } from 'react'
import { useKhataData } from '../hooks/useKhataData'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const data = useKhataData()
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
