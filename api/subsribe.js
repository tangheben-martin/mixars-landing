// api/subscribe.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, userType } = req.body;

    try {
        const response = await fetch('https://api.kit.com/v4/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.KIT_API_SECRET}`
            },
            body: JSON.stringify({
                email_address: email,
                tags: [userType],
                custom_fields: {
                    user_type: userType
                }
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const errorData = await response.json();
            return res.status(400).json({ error: errorData });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}