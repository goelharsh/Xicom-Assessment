exports.submitDocuments = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'User cannot be submit documents. Pls try again'
        })
    }
}