const express = require('express')
const connectDB = require('./DB/connection')
const app = express()
app.use(express.json())
require('dotenv').config()
const indexRouter = require('./modules/index.router')
port = process.env.PORT
const path = require('path')
const { createInvoice } = require('./services/pdfkit')
const sendEmail = require('./services/sendmail')
const fs = require('fs')


app.use('/api/v1/uplods',express.static(path.join(__dirname , './uploads')))

app.use('/api/v1/auth',indexRouter.authRouter)

app.use('/api/v1/user',indexRouter.userRouter)

app.use('/api/v1/product',indexRouter.productRouter)



const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

createInvoice(invoice, path.join(__dirname , './uploads/pdf/invoice.pdf'));



sendEmail("romaniigirgis@gmail.com",`<P>open invoice</P>`,{
   // content:attachment,
    filename:"attachment.pdf",
    type:"application/pdf",
    disposition:"attachment"
})


connectDB()
app.listen(port,()=>{
    console.log(`runing...........${port}`);
})