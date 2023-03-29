import env from "../loaders/envalid.js";

const list = {
    name: env.LIST_NAME,
    permission_reminder: 'you signed up with us for updates',
    email_type_option: true,
    contact: {
        company: "Jeferson Lucio Inc",
        address1: "53, Seventh Avenue",
        address2: "Manhattan",
        city: "New York City",
        state: "New York",
        zip: "10119",
        country: "USA",
        phone: "+1 833-247-2071"
    },
    campaign_defaults: {
        from_name: "Jeferson Lucio",
        from_email: env.LIST_FROM,
        subject: "Hello! Do you remember us?",
        language: "English"
    }
};

export default list;
