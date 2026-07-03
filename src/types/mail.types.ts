import { EmailTemplate } from "../constants/email-template";

export interface WelcomeEmailData {
  to: string;
  name: string;
  loginUrl: string;
}

export interface SendTemplateEmailOptions {
  to: string;

  subject: string;

  template: EmailTemplate;

  variables: Record<string, string>;

  text?: string;
}
