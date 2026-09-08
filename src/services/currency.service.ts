import axios from "axios"
export const convertCurrency =async(amount:number,from:string, to:string)=>{
  const response =await axios.get(
    `https://api.frankfurter.dev/v2/rate/${from}/${to}`
  )
  const rate =response.data.rate;
  const convertAmount =amount *rate;
  return{
    amount,
    from,
    to,
    rate,
    convertAmount
  }
}
