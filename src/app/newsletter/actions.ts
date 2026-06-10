'use server';

export async function subscribeForDownload(email: string, resource: string) {
  if (!email) return { success: false, error: 'Email required' };

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      status: 'active',
      groups: ['187885228086265198'],
      fields: { last_download: resource },
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { success: false, error: body?.message ?? 'Something went wrong' };
  }

  return { success: true };
}
