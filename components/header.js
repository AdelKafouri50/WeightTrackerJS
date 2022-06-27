
export default function Header({user, isLoading}){
    return (
        <div className='flex justify-between mt-4 w-full'>
            <div className='text-rose-500 p-4 cursor-default'>
            Logged in as: {user.email}
            </div>
            <div className='  h-fit p-2 text-rose-500 border-2 border-rose-500 bg-black text-sm rounded-md cursor-pointer hover:bg-rose-500 hover:text-white transition-colors' onClick={()=>{
            window.location.href = "/api/auth/logout"
        }}>
            Logout
        </div>
      </div>
    )
}