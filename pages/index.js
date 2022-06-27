import Head from 'next/head'
import { Line } from 'react-chartjs-2'
import { options } from '../utils/chartOptions'
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
  const [period, setPeriod] = React.useState('1 Week')
  const [periodArray, setPeriodArray] = React.useState(['1 Week', '2 Weeks', '1 Month', '1 Year', 'All Time'])

  React.useEffect(() => {
    async function fetchData() { 
      if (user){
        const res = await fetch(`/api/entries?user=${user.email}`)
        const data = await res.json()
        let sortedDates = data.sort((a, b) => {
          return new Date(a.dateCreated) - new Date(b.dateCreated);
        })
          switch (period) {
            case '1 Week':
              console.log(sortedDates)
              let week = sortedDates.slice(-7)
              setEntries(week)
              break;
            case '2 Weeks':
              let twoWeeks = sortedDates.slice(-14)
              setEntries(twoWeeks)
              break;
            case '1 Month':
              let month = sortedDates
              month = month.slice(-30)
              setEntries(month)
              break;
            case '1 Year':
              let year = sortedDates
              year = year.slice(-365)
              setEntries(year)
              break;
            case 'All Time':
              setEntries(sortedDates)
              break;
            default:
              break;
          }
      }
      }
    fetchData()
  }, [period, user])
  



  const data = {
    labels: entries.map(entry => `${entry.weekDay} ${entry.dateCreated.split('T').splice(0,1).join('').split('-').reverse().join('-')}`),
    datasets: [
      {
        fill: true,
        label: 'Weight',
        data: entries.map(entry => entry.weight),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error){
    return(
      <div>
        <p>Please login</p>
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
                    <PeriodButton period={item} setPeriod={setPeriod} />
                ))}
          </div>
          {entries.length > 0 ? 
          <Line options={options} data={data} />:
          <div className='text-rose-500 p-10 h-1/2'>
            Loading...
          </div>
          }
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

