import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { quizId } = req.query;

  if (!quizId) {
    return res.status(400).json({ error: 'ID do quiz é necessário para gerar o QR Code' });
  }

  try {
    const qrCodeUrl = await QRCode.toDataURL(`https://meuquiz.com/quiz/${quizId}`);
    res.status(200).json({ qrCodeUrl });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar QR Code' });
  }
}
