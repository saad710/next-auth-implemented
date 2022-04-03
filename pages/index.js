import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from "../pages/login"
import { useSession } from "next-auth/react"


export default function Home() {
  const { data: session, status } = useSession()
  console.log(session)
  
  return (
    <div className={styles.container}>
      {
        JSON.stringify(session)
      }
          <Login/>
    </div>
  )
}
