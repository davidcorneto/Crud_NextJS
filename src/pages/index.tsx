import Layout from "../components/Layout"
import Table from "../components/Table"
import Client from "../core/Client"
import Button from "../components/Button"
import Form from "../components/Form"
import { useState } from "react"

export default function Home() {

  const clients = [
    new Client("ana", 34 , '1'),
    new Client("ana", 74 , '1'),
    new Client("ana", 34 , '1')
  ]

  function clientSelected(client: Client) {}

  function clienteDeleted(client: Client) {}

  function saveClient(client: Client) {}

  const [visible, setVisible] = useState <'table' | 'form'>('table')

  return (
    <div className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500 
    text-white
    `}>
      <Layout title= "registration">
        {visible === 'table' ? (
         <>
        <div className="flex justify-end">
          <Button 
            color="green" 
            className="mb-4"
            onClick={() => setVisible('form')}>
            New Client
          </Button>
        </div>

        {<Table clients = {clients} 
        clientSelected = {clientSelected} 
        clientDeleted = {clienteDeleted}/>}

        </>

        ): (
          <Form 
          client={clients[0]}
          clientChange={saveClient}
          cancel={() => setVisible('table')}/>
        )}
      </Layout>
    </div>
  )
}
