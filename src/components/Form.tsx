import { useState } from 'react'
import Client from '../core/Client'
import Button from './Button'
import Input from './Input'

interface FormProps {
    client: Client
    clientChange?: (client: Client) => void
    cancel?: () => void
}

export default function Form(props: FormProps) {
    const id = props.client?.id
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)

    return (
        <div>
            {id? (
                <Input 
                    readonly
                    text="ID"
                    value={id}
                    className="mb-5"/>
            ): false}

            <Input 
            text="Name" 
            value={name} 
            valueChange={setName}
            className="mb-5"/>

            <Input 
            text="Age" 
            type="number" 
            value={age}
            valueChange={setAge}/>

            <div className = "flex justify-end mt-3">
                <Button 
                color="blue" 
                className="mr-2" 
                onClick={() => props.clientChange?.(new Client(name, age, id))}>
                    {id ? "Change" : "Save"}
                </Button>
                <Button onClick={props.cancel}color="gray">
                    Cancel
                </Button>
            </div>

        </div>
    )
}