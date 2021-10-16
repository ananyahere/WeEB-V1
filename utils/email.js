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

const options = {
  from: "ananyasharma852@outlook.com",
  to: "ananyasubodh8@gmail.com",
  subject: "sending email with node.js",
  text: "this is text section of the email",
  html: "<h3>Hello HTML-section</h3><img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/22341209/GucciGhost.gif'  style='width:360px;height:360px;'>"
}

transporter.sendMail(options, function(err, info){
  if(err){
    console.log(err)
    return
  }
  console.log("sent: ",info.response)
})