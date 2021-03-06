import Head from 'next/head'
import { Line } from 'react-chartjs-2'
import options from '../utils/chartOptions'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import Header from '../components/header';
import PeriodButton from '../components/periodButton';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);





export default function Home({ }) {
  const { user, error, isLoading } = useUser();
  const [entries, setEntries] = React.useState([])
  const [replica, setReplica] = React.useState([])
  const [period, setPeriod] = React.useState('2 Weeks')
  const [periodArray, setPeriodArray] = React.useState(['1 Week', '2 Weeks', '1 Month', '1 Year', 'All Time'])
  const [optionZ, setOptionZ] = React.useState({})
  const [change, setChange] = React.useState(false)
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() { 
      setLoading(true)
      if (user){
        const res = await fetch(`/api/entries?user=${user.email}`)
        const data = await res.json()
        let sortedDates = data.sort((a, b) => {
          return new Date(a.dateCreated) - new Date(b.dateCreated);
        })
        setEntries(sortedDates)
        setReplica(sortedDates.slice(-14))
      }
      setLoading(false)
      }
    fetchData()
  }, [user])

  React.useEffect(() => {
    setOptionZ(options(period))
    switch (period) {
      case '1 Week':
        console.log(entries)
        setReplica(entries.slice(-7))
        break;
      case '2 Weeks':
        setReplica(entries.slice(-14))

        break;
      case '1 Month':
        setReplica(entries.slice(-30))

        break;
      case '1 Year':
        setReplica(entries.slice(-365))

        break;
      case 'All Time':
        setReplica(entries)

        break;
      default:
        break;
    }
  }, [period])




  const data = {
    labels: replica.map(entry => `${entry.weekDay} ${entry.dateCreated.split('T').splice(0,1).join('').split('-').reverse().join('-')}`),
    datasets: [
      {
        fill: true,
        label: 'Weight',
        data: replica.map(entry => entry.weight),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
  }

  if (isLoading) {
    return <p className='text-white'>Loading...</p>;
  }

  if (error){
    return(
      <div>
        <p className='text-white'>Please login</p>
      </div>
    )
    
  }

  return (
    user? 
    (
    <div className='bg-black flex flex-col items-center h-screen'>
        <div  className="w-3/4 flex justify-between">
          <Header user={user} isLoading={isLoading}/>
        </div>
      <div className="container mx-auto my-auto h-full flex items-center flex-col">
        <Head>
          <title>Weight Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>



        <div className='h-1/2 w-3/4  mx-auto my-auto flex flex-col items-center'>
          <div className=' mt-[-2em] mb-4 w-1/2 flex justify-between'>
            {periodArray.map(item => (
                    <PeriodButton loading={loading} replica={replica} key={item} period={item} setPeriod={setPeriod} change={change} setChange={setChange}/>
                ))}
          </div>
            {!loading && entries.length > 0 &&
              <Line options={optionZ} data={data} />
            }
            {loading &&
              <div className='text-rose-500 p-10 h-1/2'>
                Loading...
              </div>}

            {!loading && entries.length == 0 &&
              <div className='text-rose-500 p-10 h-1/2'>
                No data found. Please add an entry
              </div>}
  
        <div className=' mt-6 p-4 bg-rose-500 text-black rounded-md cursor-pointer hover:bg-red-500 transition-colors' onClick={()=>{
          window.location.href = '/new'
        }}>
          Add Weight Entry
        </div>
        </div>
      </div>
    </div>
    ):
  (
  <>
  <div className='bg-black h-screen flex justify-center items-center gap-4'>
    <p className='text-rose-500'>Please login</p>
    <div className='  h-fit p-2 text-rose-500 border-2 border-rose-500 bg-black text-sm rounded-md cursor-pointer hover:bg-rose-500 hover:text-white transition-colors' onClick={()=>{
          window.location.href = "/api/auth/login"
        }}>
          Login
    </div>
  </div>
  </>
  )
  )
}

