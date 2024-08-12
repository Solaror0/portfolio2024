import nodemailer from "nodemailer";

export async function POST(req) {
  if (req.method === "POST") {
    const reqBody = await req.json(); // Parse the request body as JSON
    const { name, email, subj, body } = reqBody;

    console.log(reqBody + "hi");
    console.log(name, email, subj, body + "hello");
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your email service (e.g., 'gmail')
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
      secure: true,
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email address
      subject: `Website Message from ${email}` + `${subj}` + `Name: ${name}`,
      text: body,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return new Response(
        JSON.stringify({ message: "Contact form submitted!" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return new Response(JSON.stringify({ message: "Error sending email." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "hello" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
}
