const transporter = require("../config/emailConnection")
const {MAIL_MANAGER, MAIL_SERVER} = process.env;

async function sendEmailManager(text, id) {
    try {
        var result = await transporter.sendMail({
            from: MAIL_SERVER,
            to: MAIL_MANAGER,
            subject: `ORDER (id: ${id})`,
            text: `${text}`,
        });
    }catch (error){
        console.log(error);
    }

    console.log(result);
}


async function sendEmailCustomer(email) {
    let result = await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: 'user@example.com, user@example.com',
        subject: 'Message from Node js',
        text: 'This message was sent from Node js server.',
        html: "This <i>message</i> was sent from <strong>Node.js</strong> server.",
    });

    console.log(result);
}

module.exports = {
    sendEmailCustomer,
    sendEmailManager,
};