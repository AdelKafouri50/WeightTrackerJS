import Head from 'next/head'
import { Line } from 'react-chartjs-2'
import { options } from '../utils/chartOptions'
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





export default function Home({ entries }) {
  let sortedDates = entries.sort((a, b) => {
    return new Date(a.dateCreated) - new Date(b.dateCreated);
  })

  const data = {
    labels: sortedDates.map(entry => `${entry.weekDay} ${entry.dateCreated.split('T').splice(0,1).join('').split('-').reverse().join('-')}`),
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

  return (
    <div className="container mx-auto my-auto h-screen flex items-center flex-col ">
      <Head>
        <title>Weight Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='h-1/2 w-3/4  mx-auto my-auto flex flex-col items-center'>
        <Line options={options} data={data} />
      <div className='border mt-6 p-4 bg-rose-500 text-white rounded-md cursor-pointer hover:bg-red-500 transition-colors' onClick={()=>{
        window.location.href = '/new'
      }}>
        Add Weight Entry
      </div>
      </div>
    </div>
  )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/entries')
  const entries = await res.json()

  return {
    props: { entries }
  }
}


