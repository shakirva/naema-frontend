import fs from "fs";

async function testRegistration() {
  const backendUrl = "http://187.127.166.159:9000";
  const publishableKey = "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042";

  const email = `test_${Date.now()}@test.com`;
  
  console.log("1. Registering Auth Identity for:", email);
  const authRes = await fetch(`${backendUrl}/auth/customer/emailpass/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password123" }),
  });
  const authData = await authRes.json();
  console.log("Auth Data:", authData);

  console.log("2. Creating Customer Profile");
  const custRes = await fetch(`${backendUrl}/store/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authData.token}`,
      "x-publishable-api-key": publishableKey,
    },
    body: JSON.stringify({ email, first_name: "Test", last_name: "User" }),
  });
  const custData = await custRes.json();
  console.log("Customer Data:", custData);
  
  console.log("3. Logging in again to check token");
  const loginRes = await fetch(`${backendUrl}/auth/customer/emailpass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password123" }),
  });
  const loginData = await loginRes.json();
  console.log("Login Token:", loginData.token ? "Received" : "Missing", loginData);
}

testRegistration().catch(console.error);
