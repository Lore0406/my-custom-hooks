import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const useFetch = (url) => {

   // useRef 
   const isMounted = useRef( true )

   const [ state, setState ] = useState({ data: null, loading: true, error: null })
  
   useEffect( () => {
      return () => {
         isMounted.current = false
      }

   }, [])

   useEffect( () => {

      setState({ data: null, loading: true, error: null })

      fetch( url )
      .then( resp => resp.json() )
      .then( data =>{

         // testing useRef 
         // setTimeout( () =>{
            if ( isMounted.current) {
               setState({
                  loading: false,
                  error: null, 
                  data,
               })
            }else{
               console.log('setState hasnt been called')
            }
         // }, 3000)

      })

   }, [url])

   return state
}
