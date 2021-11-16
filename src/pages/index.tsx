import { useState } from "react"
import Layout from "../components/Layout"
import Table from "../components/Table"
import Client from "../core/Client"
import Button from "../components/Button"
import Form from "../components/Form"
import ClientRepository from "../core/CllientRepository"
import ClientColection from "../backend/db/ClientColection"
import { useEffect } from "react"

export default function Home() {

  const  repo: ClientRepository = new ClientColection()
  
  const [client, setClient] = useState<Client>(Client.void())
  const [clients, setClients] = useState<Client[]>([])
  const [visible, setVisible] = useState <'table' | 'form'>('table')
  
  useEffect(getAll, [])

  function getAll() {
    repo.getAll().then(clients => {
      setClients(clients)
      setVisible("table")
    } )
  }

  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
  }

  function clienteDeleted(client: Client) {}

  function newClient() {
    setClient(Client.void)
    setVisible("form")
  }

  async function saveClient(client: Client) {
    await repo.save(client)
    getAll()
  }


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
            onClick={newClient}>
            New Client
          </Button>
        </div>

        {<Table clients = {clients} 
        clientSelected = {clientSelected} 
        clientDeleted = {clienteDeleted}/>}

        </>

        ): (
          <Form 
          client={client}
          clientChange={saveClient}
          cancel={() => setVisible('table')}/>
        )}
      </Layout>
    </div>
  )
}
