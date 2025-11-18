import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { getEmail } from './getEmail';
import { frontEndUrl, IMAGE_QUERY } from './variables';
import { getImageUrl } from './getImageUrl';
import { getFrontendFullURL } from './getFrontendFullURL';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 2525,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendMail = async (to: string, subject: string, page: string, data: Record<string, any>) => {
  
  try {

    const career = await getEmail({
      select: ['send_mail'],
      populate: {
          career: {
              select: [
                  'name',
                  'description_1',
                  'description_2',
                  'description_3',
                  'description_4',
                  'description_5',
                  'wishes',
                  'regards',
                  'social_media_title',
                  'message',
                  'copyright_text',
              ],
              populate: {
                  logo: IMAGE_QUERY,
                  banner: IMAGE_QUERY,
                  button: {
                      select: ['title', 'url']
                  },
                  blogs_url: {
                      select: ['title', 'url']
                  },
                  website_url: {
                      select: ['title', 'url']
                  },
                  social_media: {
                      select: ['url'],
                      populate: {
                          image: IMAGE_QUERY
                      }
                  },
              }
          }
      }
    })

    console.log('career', career);

    function capitalizeFirstLetter(name: string) {
      return (
        name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase()
      );
    }

    if(!career?.send_mail) {
      console.log('send_mail is false');
      return;
    }

    const from = process.env.SMTP_FROM ?? "noreply@qa-luluforex-next.webc.in"

    const templatePath = path.join(
      process.cwd(),
      "public",
      "email",
      "career.html"
    );

    const source = fs.readFileSync(templatePath, "utf8");

    const template = Handlebars.compile(source);

    if(data?.name) {
      data.name = capitalizeFirstLetter(data.name);
    }
    data.name = career.name = career?.name ?? 'Title';
    data.logo = career?.logo ? getImageUrl(career.logo) : 'image';
    data.banner = career?.banner ? getImageUrl(career.banner) : 'image';
    data.description_1 = career?.description_1 ? `<p
        style="font-size: 16px; font-family:Inter,Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-weight: 400; line-height: 1.7;color: #4F4F4F;margin-top: 16px;">
        ${career?.description_1}
    </p>` : ``;
    data.description_2 = career?.description_2 ? `<p
        style="font-size: 16px; font-family:Inter,Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-weight: 400; line-height: 1.7;color: #4F4F4F;margin-top: 16px;">
        ${career?.description_2}
    </p>` : ``;
    data.description_3 = career?.description_3 ? `<p
        style="font-size: 16px; font-family:Inter,Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-weight: 400; line-height: 1.7;color: #4F4F4F;margin-top: 16px;">
        ${career?.description_3}
    </p>` : ``;
    data.description_4 = career?.description_4 ? `<p
        style="font-size: 16px; font-family:Inter,Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-weight: 400; line-height: 1.7;color: #4F4F4F;margin-top: 16px;">
        ${career?.description_4}
    </p>` : ``;
    data.description_5 = career?.description_5 ? `<p
        style="font-size: 16px; font-family:Inter,Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-weight: 400; line-height: 1.7;color: #4F4F4F;margin-top: 16px;">
        ${career?.description_5}
    </p>` : ``;
    data.wishes = career?.wishes ?? 'Best wishes,';
    data.regards = career?.regards ?? 'The Luluforex HR Team';
    data.social_media_title = career?.social_media_title ?? 'Follow us on';
    data.button_title = career?.button?.title ?? 'Follow us on';
    data.button_url = career?.button?.url ? getFrontendFullURL(career.button.url) : getFrontendFullURL('/career');
    data.blogs_title = career?.blogs_url?.title ?? 'Read more blogs';
    data.blogs_url = career?.blogs_url?.url ? getFrontendFullURL(career.blogs_url.url) : getFrontendFullURL('/blogs');
    data.website_title = career?.website_url?.title ?? 'Visit Website';
    data.website_url = frontEndUrl ?? getFrontendFullURL(career?.website_url.url);
    console.log('career?.message', career?.message);
    data.message = career?.message ?? 'Thank you for contacting, will get back to you shortly.';
    data.links = career?.social_media?.map(item => {
      return `
        <td style="text-align: center; padding: 0 8px">
          <a href="${item?.url}" style="display: block" target="_blank">
            <img src="${getImageUrl(item?.image)}" alt="${item?.name}" width="25" height="25" style="vertical-align: middle">
          </a>
        </td>
      `
    }).join("");
    data.copyright_text = `© ${new Date().getFullYear()} LuLu Forex Pvt. Ltd. · All rights reserved.`;

    let html = template(data);

    const mailOptions = {
      from,
      to,
      subject,
      html
    }

    const info = await transport.sendMail(mailOptions);

    console.log('Message sent: %s', info);

  } catch (error) {
    console.log('error', error);
  }

};
