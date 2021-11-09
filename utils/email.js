const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
  {
    service: "hotmail",
    auth: {
      user: "ananyasharma852@outlook.com",
      pass: "chunchun8",
    }
  }
)

const mailHandler = (userEmail, userID, token) => {
  const options = {
    from: "ananyasharma852@outlook.com",
    to: userEmail,
    subject: "sending email with node.js",
    text: "this is text section of the email",
    html: `<h6>http://localhost:8000/reset-password/${userEmail}/${userID}/${token}</h6><img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/22341209/GucciGhost.gif'  style='width:360px;height:360px;'>`
  }
  
  transporter.sendMail(options, function(err, info){
    if(err){
      console.log(err)
      return
    }
    console.log("sent: ",info.response)
  })

}

module.exports = mailHandler