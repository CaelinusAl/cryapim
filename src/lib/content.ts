import tr from "@/content/site.tr.json";
import en from "@/content/site.en.json";

export type Locale = "tr" | "en";

export interface NavItem {
  href: string;
  label: string;
}

export interface MetaRow {
  label: string;
  value: string;
  accent?: boolean;
}

export interface ServiceItem {
  title: string;
  body: string;
  tags: string;
}

export interface WorkItem {
  badge: string;
  titleOn: string;
  metaIndex: string;
  year: string;
  name: string;
  desc: string;
  tags: string;
  cta: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ManifestoLine {
  a: string;
  b: string;
}

export interface FooterLink {
  href?: string;
  label: string;
  accent?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface Content {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    menu: string;
    items: NavItem[];
  };
  hero: {
    titleL1: string;
    titleL2: string;
    brand: string;
    status: string;
    role: string;
    hint: string;
  };
  world: {
    gatewayLabel: string;
    gatewayTitlePre: string;
    gatewayTitleEm: string;
    gatewayTitlePost: string;
    gatewayLead: string;
    fullPage: string;
    nextRealm: string;
    realms: Array<{ id: string; tagline: string }>;
  };
  marquee: {
    items: string[];
  };
  about: {
    label: string;
    headlineL1: string;
    headlineL2: string;
    headlineL3: string;
    body: string[];
    meta: MetaRow[];
  };
  services: {
    label: string;
    items: ServiceItem[];
  };
  works: {
    label: string;
    items: WorkItem[];
  };
  process: {
    label: string;
    steps: ProcessStep[];
  };
  manifesto: {
    label: string;
    lead: string;
    lines: ManifestoLine[];
    close: string;
    sig: string;
  };
  cta: {
    headingPre: string;
    headingEm: string;
    headingPost: string;
    sub: string;
    btn: string;
    email: string;
    loc: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    columns: FooterColumn[];
    base1: string;
    base2: string;
  };
}

const contentByLocale: Record<Locale, Content> = {
  tr: tr as Content,
  en: en as Content,
};

export const defaultLocale: Locale = "tr";

export function getContent(locale: Locale = defaultLocale): Content {
  return contentByLocale[locale];
}
