const base64UrlEncode = (value) => {
  return btoa(JSON.stringify(value))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const base64UrlDecode = (value) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");

  return JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split("")
        .map(
          (char) =>
            "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    )
  );
};

export const createMockJWT = (user) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    sub: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  const signature = btoa(
    `${encodedHeader}.${encodedPayload}-mock-signature`
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const decodeMockJWT = (token) => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    return base64UrlDecode(parts[1]);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = decodeMockJWT(token);

  if (!payload || !payload.exp) {
    return true;
  }

  return payload.exp * 1000 < Date.now();
};