import { client } from "../client";
import ContactForm from "./Contact";

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const PROFILE_QUERY = `*[
  _type == "profile"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  contact_title: string;
  contact_title_span: string;
}

interface ProfileDataDocument {
  email: string;
}

const ContactSection = async () => {
  const [profileDataResponse, titleDataResponse] = await Promise.all([
    client.fetch<ProfileDataDocument>(PROFILE_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);

  if (!profileDataResponse)
    return <section id="contact" className="w-full px-6 lg:px-0 py-8" />;

  return (
    <ContactForm
      profileDataResponse={profileDataResponse}
      titleDataResponse={titleDataResponse}
    />
  );
};

export default ContactSection;
