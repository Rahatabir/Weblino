// Shared helper for admin/customer panel pages
async function api(path, options = {}) {
  const res = await fetch('/api' + path, {
    method: options.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  let data = {};
  try { data = await res.json(); } catch (e) {}
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso.replace(' ', 'T') + 'Z');
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// Redirects to the right login page if not authenticated as the required role.
async function guard(requiredRole, loginUrl) {
  try {
    const { user } = await api('/auth/me');
    if (user.role !== requiredRole) {
      window.location.href = loginUrl;
      return null;
    }
    return user;
  } catch (e) {
    window.location.href = loginUrl;
    return null;
  }
}

async function logout(redirectUrl) {
  await api('/auth/logout', { method: 'POST' });
  window.location.href = redirectUrl;
}
