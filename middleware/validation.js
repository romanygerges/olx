const dataMethod = ['body','params','query','headers','files']


const validation = (schema)=>{

    

return (req,res,next)=>{
    const validationErrArr = []
    dataMethod.forEach(key=>{
        if(schema[key]){
            const validationResult = schema[key].validate(req[key],{abortEarly:false});
            if(validationResult.error){
                validationErrArr.push(validationResult.error.details)
                res.json({message:"validation error", err:validationResult.error.details})
            }
        }
    })
    
    if(validationErrArr.length){
        res.status(400).json({message:"validation error", validationErrArr})
    }else{
        next()
    }
}
}

module.exports = validation