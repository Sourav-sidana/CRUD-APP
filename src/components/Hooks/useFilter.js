import { useState } from "react"

export function useFilter(dataList, callBack){
    const [query , setQuery] = useState("")
   const filteredData =  dataList.filter((data)=>{
        return callBack(data).toLowerCase().includes(query)
        
      })
      return [filteredData , setQuery]


}