

  export default function options (period){
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Weight Over ${period}`,
        },
      },
    }
  }



  
  