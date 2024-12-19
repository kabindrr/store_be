export const UserActivationUrlEmailTemplate = ({ email, name, url }) => {
    console.log(email);
    return {
      from: `Local Library <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Action Required - Activate your new Account",
      text: `Hello to ${name} please follow the link to activate your account! ${url}`,
      html: `
      <br />
  <br />
  <p>Your account has been created. Click the button below to activate your account</p>
  <br />
  <br />
  <a href = ${url}>
  <button style="background: green; color: white; padding: 2rem">Activate Now</button></a>
  <br />
  <br />
      
      `,
    };
  };
  