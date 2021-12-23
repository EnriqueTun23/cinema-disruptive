import { useState } from "react"
// hook para formatear el valor que se optiene de los campos de formulario
export const useForm = (initialState = {}) => {
    const [values, setvalues] = useState(initialState)

    const reset = () => {
        setvalues( initialState )
    }

    const handleInputChange = ({target}) => {
        setvalues({
            ...values,
            [target.name]: target.value
        })
    }

    return [ values, handleInputChange, reset ]
}