const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")


const sendMessageController = async (req, res) => {
    try{
        const message = req.body.message
        const receiverId = req.params.id
        const senderId = req.user._id

        // find if there is previous conversation between two users or not
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        })

        // if not the create conversation
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            })
        }

        // create message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        // add created message into messages array of converstation
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // save both message and conversation object
        await Promise.all([newMessage.save(), conversation.save()])
        

        res.status(200).json({
            success : true,
            result : "Message has been sent Successfully!"
        })
    }catch(err){
        console.log("Error:", err)
        res.status(400).json({
            success : false,
            message : 'Errror in database!'
        })
    }
}


const getMessasgesController = async (req, res) => {
    try{
        const userToChatId = req.params.id
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages")

        res.status(200).json({
            success : true,
            result : conversation?.messages ? conversation?.messages : []
    })


    }catch(err){
        console.log("Error:", err)
        res.status(400).json({
            success : false,
            message : 'Errror in database!'
        })
    }
}

module.exports = {sendMessageController, getMessasgesController}