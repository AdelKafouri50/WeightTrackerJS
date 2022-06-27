
export default function PeriodButton({period, setPeriod}){
    return (
        <div className=" p-2 border-2 border-rose-500 text-rose-500 cursor-pointer hover:bg-rose-500 hover:text-black rounded-md transition-colors" onClick={()=> {
                setPeriod(period)
            }}>
            {period}
        </div>
    )
}
