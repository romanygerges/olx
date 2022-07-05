const nodeoutlook = require('nodejs-nodemailer-outlook');

async function sendEmail(dest, message, attachment) {
if (!attachment) {
    const attachment = []
}
  nodeoutlook.sendEmail({
    auth: {
        user: process.env.senderEmail,
        pass: process.env.senderPassword
    },
    from: process.env.senderEmail,
    to: dest,
    subject: 'Hey you, awesome!',
    html: message,
    attachment:attachment,
    
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
}


);
    }






module.exports = sendEmail



