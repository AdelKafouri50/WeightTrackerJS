import React from 'react'

export default function PeriodButton({period, setPeriod, change, setChange, replica, loading}){
  const [clicked, setClicked] = React.useState(false)

  React.useEffect(() => {
      setClicked(false)
      console.log(clicked)
  }, [change])

  React.useEffect(()=> {
      if (replica){
          if (period === '2 Weeks'){
              setClicked(true)
          }
      }
  }, [])



    return (
        <div className={`p-2 border-2 border-rose-500 ${clicked?'bg-rose-500 text-black':'bg-black text-rose-500'} cursor-pointer hover:bg-rose-500 hover:text-black rounded-md transition-colors`}
            onClick={()=> {
                setChange(!change)
                setPeriod(period)
                setTimeout(() => {
                    setClicked(true)
                }, 0.01);
            }}
            disabled = {loading}
            >
            {period}
        </div>
    )
}
