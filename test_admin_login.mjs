async function testAdminLogin() {
  const backendUrl = "http://187.127.166.159:9000";
  const email = "admin@newclient.com";
  const password = "Admin1234";

  console.log("1. Authenticating emailpass...");
  const authRes = await fetch(`${backendUrl}/auth/user/emailpass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  console.log("Auth Status:", authRes.status);
  const authData = await authRes.json();
  console.log("Auth Data:", authData);
  
  if (!authRes.ok) {
    console.error("Auth failed");
    return;
  }

  // Grab the cookie if any
  const authCookies = authRes.headers.get("set-cookie");
  console.log("Auth Set-Cookie:", authCookies);

  console.log("\n2. Creating session...");
  const sessRes = await fetch(`${backendUrl}/auth/session`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${authData.token}`,
      "Content-Type": "application/json"
    },
  });

  console.log("Session Status:", sessRes.status);
  const sessData = await sessRes.json();
  console.log("Session Data:", sessData);
  
  const sessionCookies = sessRes.headers.get("set-cookie");
  console.log("Session Set-Cookie:", sessionCookies);

  if (!sessionCookies) {
    console.warn("No session cookies returned!");
  }

  console.log("\n3. Accessing /admin/users/me with session cookies...");
  const meRes = await fetch(`${backendUrl}/admin/users/me`, {
    headers: {
      "Cookie": sessionCookies || "",
    }
  });

  console.log("Me Status:", meRes.status);
  const meText = await meRes.text();
  console.log("Me Response:", meText);
}

testAdminLogin().catch(console.error);
