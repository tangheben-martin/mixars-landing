export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyqcOFYlKpDFuH8Puo48-Zj77t_c2P_MjMGjVITtwzTmCamG1Dt-iRp5QRpWXILw-zQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
}