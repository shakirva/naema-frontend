import Medusa from "@medusajs/js-sdk";

export const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://187.127.166.159:9000";

const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
});

export default medusa;
