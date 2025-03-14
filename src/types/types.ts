export type THTTPRESPONSE = {
  success: boolean;
  status: number;
  message: string;
  data: unknown;
  requestInfo: {
    ip?: string;
    url: string | null;
    method: string | null;
  };
};
export interface ICOOKIEOPTIONS {
  httpOnly: true;
  secure: boolean;
  sameSite: "none";
  expires: Date;
}

export interface MenuItemType {
  id: number;
  title: string;
  subTitle?: string;
  description?: string;
  pageData?: ISECTION[];
  href: string;
  image?: string;
  children?: MenuItemType[];
}
export type SECTIONTYPE = "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK";
export interface ISECTION {
  id: number;
  title: string;
  subTitle?: string;
  sectionType: SECTIONTYPE;
  description: string;
  icon?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  description0?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
  description6?: string;
  sectionChildren?: ISECTION[];
}
