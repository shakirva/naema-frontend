"use server";

import { cookies } from "next/headers";
import medusa from "../lib/medusa";

function getBackendUrl() {
  const envUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  if (!envUrl) return "http://127.0.0.1:9000";
  
  // If running on Vercel, we must use the public URL
  if (process.env.VERCEL === "1" || process.env.NEXT_PUBLIC_VERCEL === "1") {
    return envUrl;
  }
  
  // Direct loopback for local server-side requests (virtual sub-millisecond responses)
  return envUrl
    .replace("http://187.127.166.159/api", "http://127.0.0.1:9000")
    .replace("http://187.127.166.159:9000", "http://127.0.0.1:9000");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const backendUrl = getBackendUrl();

  try {
    const res = await fetch(`${backendUrl}/auth/customer/emailpass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return { error: data.message || "Invalid email or password." };
    }
    
    if (data.token) {
      (await cookies()).set("_medusa_jwt", data.token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: "lax",
        secure: false, // Set to false to support staging HTTP URLs
      });
      return { success: true };
    }
    
    return { error: "An unexpected error occurred." };
  } catch (err: any) {
    return { error: err.message || "Something went wrong." };
  }
}

export async function signup(formData: FormData) {
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required." };
  }

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    // 1. Register Auth Identity
    const authRes = await fetch(`${backendUrl}/auth/customer/emailpass/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const authData = await authRes.json();
    if (!authRes.ok) return { error: authData.message || "Registration failed." };
    if (!authData.token) return { error: "No token returned from registration." };

    // 2. Create Customer Profile
    const custRes = await fetch(`${backendUrl}/store/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authData.token}`,
        "x-publishable-api-key": publishableKey,
      },
      body: JSON.stringify({ email, first_name: firstName, last_name: lastName }),
    });

    const custData = await custRes.json();
    if (!custRes.ok) {
      return { error: custData.message || "Failed to create customer profile." };
    }

    // 3. Set Cookie
    (await cookies()).set("_medusa_jwt", authData.token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: false, // Set to false to support staging HTTP URLs
    });
    
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Something went wrong during signup." };
  }
}

export async function getCurrentCustomer() {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (!token) return { customer: null };

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/customers/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-publishable-api-key": publishableKey,
      },
      next: { revalidate: 0 },
    });
    
    if (!res.ok) {
      return { customer: null };
    }
    
    const data = await res.json();
    return { customer: data.customer || null };
  } catch (err) {
    console.error("Failed to fetch customer profile:", err);
    return { customer: null };
  }
}

export async function logoutCustomer() {
  (await cookies()).delete("_medusa_jwt");
  return { success: true };
}

export async function getCustomerOrders() {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (!token) return { orders: [] };

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/orders?fields=id,display_id,status,fulfillment_status,payment_status,created_at,subtotal,shipping_total,tax_total,total,currency_code,items.*,shipping_address.*,billing_address.*`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-publishable-api-key": publishableKey,
      },
      next: { revalidate: 0 },
    });
    
    if (!res.ok) {
      return { orders: [] };
    }
    
    const data = await res.json();
    return { orders: data.orders || [] };
  } catch (err) {
    console.error("Failed to fetch customer orders:", err);
    return { orders: [] };
  }
}

export async function getProductReviews(productId: string) {
  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/products/${productId}/reviews`, {
      headers: {
        "x-publishable-api-key": publishableKey,
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return { reviews: [] };
    const data = await res.json();
    return { reviews: data.reviews || [] };
  } catch (err) {
    console.error("Failed to get product reviews:", err);
    return { reviews: [] };
  }
}

export async function createProductReview(
  productId: string,
  rating: number,
  title: string,
  content: string,
  customerId?: string,
  customerName?: string
) {
  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": publishableKey,
      },
      body: JSON.stringify({ rating, title, content, customer_id: customerId, customer_name: customerName }),
    });
    if (!res.ok) {
      const errData = await res.json();
      return { error: errData.message || "Failed to submit review" };
    }
    const data = await res.json();
    return { success: true, review: data.review };
  } catch (err: any) {
    console.error("Failed to create product review:", err);
    return { error: err.message || "Something went wrong" };
  }
}

export async function cancelCustomerOrder(orderId: string) {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (!token) return { error: "Unauthorized: not logged in" };

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/orders/${orderId}/cancel`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-publishable-api-key": publishableKey,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.message || "Failed to cancel order" };
    }
    return { success: true };
  } catch (err: any) {
    console.error("Failed to cancel order:", err);
    return { error: err.message || "Failed to cancel order" };
  }
}

export async function completeCheckoutFlowServer(
  cartId: string,
  email: string,
  shippingAddress: any,
  billingAddress: any
) {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-publishable-api-key": publishableKey,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    // If customer is logged in, always use their authenticated email
    // This prevents orders from being linked to wrong customer when
    // user types a different email in the checkout form
    let checkoutEmail = email;
    if (token) {
      try {
        const meRes = await fetch(`${backendUrl}/store/customers/me`, { headers });
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.customer?.email) {
            checkoutEmail = meData.customer.email;
          }
        }
      } catch (_) {
        // Fall back to form email if customer fetch fails
      }
    }

    // 1. Update Cart Address & Email (and customer_id if token exists)
    const updateRes = await fetch(`${backendUrl}/store/carts/${cartId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: checkoutEmail,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update cart delivery parameters.");
    }

    // 2. Fetch Shipping Options
    const shippingOptsRes = await fetch(`${backendUrl}/store/shipping-options?cart_id=${cartId}`, {
      headers,
    });
    if (!shippingOptsRes.ok) {
      throw new Error("Failed to retrieve shipping options for your region.");
    }
    const shippingOptsData = await shippingOptsRes.json();
    const shippingOpts = shippingOptsData.shipping_options || [];
    
    // Filter options with valid amount
    const validOpts = shippingOpts.filter((o: any) => typeof o.amount === 'number');
    if (validOpts.length === 0) {
      throw new Error("No active shipping options available for the Kuwait region. Please contact support.");
    }

    // Add first shipping option to cart
    const addShipRes = await fetch(`${backendUrl}/store/carts/${cartId}/shipping-methods`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        option_id: validOpts[0].id,
      }),
    });
    if (!addShipRes.ok) {
      throw new Error("Failed to assign shipping method to cart.");
    }

    // 3. Initiate Payment Session
    // We need to create payment collection first if missing
    const cartRetrieveRes = await fetch(`${backendUrl}/store/carts/${cartId}`, { headers });
    const cartRetrieveData = await cartRetrieveRes.json();
    const cartObj = cartRetrieveData.cart;

    let pColId = cartObj?.payment_collection?.id;
    if (!pColId) {
      const pColRes = await fetch(`${backendUrl}/store/payment-collections`, {
        method: "POST",
        headers,
        body: JSON.stringify({ cart_id: cartId }),
      }).then(r => r.json());
      pColId = pColRes.payment_collection?.id;
    }

    if (!pColId) {
      throw new Error("Failed to configure payment collection context.");
    }

    // Create payment session
    const pSessionRes = await fetch(`${backendUrl}/store/payment-collections/${pColId}/payment-sessions`, {
      method: "POST",
      headers,
      body: JSON.stringify({ provider_id: "pp_system_default" }),
    });
    if (!pSessionRes.ok) {
      throw new Error("Failed to initialize payment session context.");
    }

    // 4. Complete Cart
    const completeRes = await fetch(`${backendUrl}/store/carts/${cartId}/complete`, {
      method: "POST",
      headers,
    });

    const completeData = await completeRes.json();
    if (!completeRes.ok) {
      throw new Error(completeData.message || "Failed to complete order checkout.");
    }

    return { success: true, order: completeData.order };
  } catch (err: any) {
    console.error("Checkout server action failed:", err);
    return { error: err.message || "Something went wrong during checkout." };
  }
}


export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  const nodemailer = require("nodemailer");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "vashakir245@gmail.com",
        pass: "bxbi keec bkzm gthg",
      },
    });

    const mailOptions = {
      from: `"Naema Store" <vashakir245@gmail.com>`,
      to: "neamafoodstuff@gmail.com, shakirshaki245@gmail.com",
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
          <h2 style="color: #0b1a30; border-bottom: 2px solid #ccba78; padding-bottom: 8px;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ccba78; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to send contact email:", err);
    return { error: err.message || "Failed to send message. Please try again." };
  }
}

export async function updateCustomerDetails(data: { first_name?: string; last_name?: string; phone?: string }) {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (!token) return { error: "Unauthorized" };

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/customers/me`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-publishable-api-key": publishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (!res.ok) {
      return { error: resData.message || "Failed to update profile details" };
    }
    return { success: true, customer: resData.customer };
  } catch (err: any) {
    console.error("Failed to update profile details:", err);
    return { error: err.message || "Failed to update profile details" };
  }
}

export async function addCustomerAddress(addressData: {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone: string;
}) {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (!token) return { error: "Unauthorized" };

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/customers/me/addresses`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-publishable-api-key": publishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: addressData }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.message || "Failed to add address" };
    }
    return { success: true };
  } catch (err: any) {
    console.error("Failed to add address:", err);
    return { error: err.message || "Failed to add address" };
  }
}

export async function deleteCustomerAddress(addressId: string) {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (!token) return { error: "Unauthorized" };

  const backendUrl = getBackendUrl();
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  try {
    const res = await fetch(`${backendUrl}/store/customers/me/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-publishable-api-key": publishableKey,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.message || "Failed to delete address" };
    }
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete address:", err);
    return { error: err.message || "Failed to delete address" };
  }
}
