const PORT=8000
const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const{GoogleGenerativeAI}=require('@google/generative-ai')
const genAI=new GoogleGenerativeAI("AIzaSyD70xN6qsD450BG7y8lswMg43Q9-nM32do")

app.post('/gemini',async(req,res)=>{
    console.log(req.body.history)
    console.log(req.body.message)
    const model=genAI.getGenerativeModel({model:"gemini-pro",tools:{
        cors: true
    }})
const chat=model.startChat({
    history:req.body.history
})
const msg=req.body.message
const result=await chat.sendMessage(msg)
const response=await result.response
const text=response.text()
console.log(result)
res.send(text)

})

app.listen(PORT,()=>console.log('listening on port ',PORT))
