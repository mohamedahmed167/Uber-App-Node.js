import { Request ,Response } from "express";
import { convertCurrency } from "../services/currency.service";


export const convertCurrencyController =async(req:Request ,res:Response)=>{
  try{
    const {amount,from,to}=req.query;
    if(!amount || !from  ||!to){
      return res.status(400).json({
        success :false,
        message:"amount ,from and to are required"})
    }
    const result =await convertCurrency(
      Number(amount),
      String(from).toUpperCase(),
      String(to).toUpperCase()
    )
    return res.status(200).json({
      success: true,
      data: result,
    });
  }catch(error :any){
    console.log(error.response?.data || error.message)
  }
     return res.status(500).json({
       success: false,
       message: "Currency conversion failed",
     });
}
