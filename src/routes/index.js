const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.send("API SendMailer");
});

// From API
router.post("/api/email", async (req, res) => {
  const { profile, name, company, email, phone, message } = req.body;

  contentHTML = `
        <h1>Detalle del mensaje</h1>
        <ul>
            <li>Perfil: ${profile}</li>
            <li>Nombre: ${name}</li>
            <li>Empresa: ${company}</li>
            <li>Correo electrónico: ${email}</li>
            <li>Teléfono: ${phone}</li>
        </ul>
        <h3>Mensaje:</h3>
        <p>${message}</p>
    `;

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: '"Formulario Web" <test@ittalent.pe>', // sender address,
    to: "raul.chiquillan@ittalent.pe",
    subject: "Nuevo mensaje desde página de contacto",
    html: contentHTML,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.json({
    status: "success",
  });
  // res.redirect("/success.html");
});

module.exports = router;
