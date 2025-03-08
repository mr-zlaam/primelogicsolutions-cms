export declare function generateRandomStrings(length: number): string;
export declare function generateSlug(slugString: string): string;
export declare function generateOtp(
  length?: number,
  expiryValue?: number,
  expiryUnit?: "s" | "m" | "h" | "d"
): {
  otp: string;
  otpExpiry: Date;
};
export declare function defineExpireyTime(expiryValue?: number, expiryUnit?: "s" | "m" | "h" | "d"): Date;
export declare function generateUsername(fullName: string): string;
export declare function lowerCase(text: string): string;
