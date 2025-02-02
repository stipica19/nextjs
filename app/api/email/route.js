import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    console.log("----------->", name, message);
    const response = await resend.emails.send({
      from: `${name} <info@endurodriftbosnien.com>`,
      to: ["endurodriftbosnien@gmail.com"],
      subject: `Poruka od ${name}`,
      replyTo: email,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Nova poruka od :  ${name}!</h2>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; font-size: 15px;"><strong>Poruka :</strong></p>
              <p style="font-style: italic; color: #333;">"${message}"</p>
          </div>               
      </div>
  `,
    });

    await resend.emails.send({
      from: "Enduro Drift Bosnien Support <info@endurodriftbosnien.com>", // Verifikovani domen
      to: [email],
      subject: "Vielen Dank, dass Sie uns kontaktiert haben!",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    

          <h2 style="color: #333; text-align: center;">Vielen Dank, dass Sie uns kontaktiert haben, ${name}!</h2>
          <p style="font-size: 16px; color: #555;">
              Ihre Nachricht wurde erhalten und unser Team wird sich bald bei Ihnen melden.
          </p>
          
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; font-size: 15px;"><strong>Vaša poruka:</strong></p>
              <p style="font-style: italic; color: #333;">"${message}"</p>
          </div>

          <p style="font-size: 16px; color: #555; margin-top: 20px;">
              Wenn Sie weitere Fragen haben, können Sie uns gerne unter kontaktieren 
              <a href="mailto:endurodriftbosnien@gmail.com" style="color: #007bff; text-decoration: none;">endurodriftbosnien@gmail.com</a>
          </p>

          <div style="text-align: center; margin-top: 30px;">
              <a href="https://endurodriftbosnien.com" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Besuchen Sie unsere Website
              </a>
          </div>

          <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
             Mit freundlichen Grüßen, <br>
              <strong>Enduro Drift Bosnien Team</strong>
          </p>
      </div>
  `,
    });
    return Response.json({ success: true, data: response });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
