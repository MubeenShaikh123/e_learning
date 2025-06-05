
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'File parsing error.' });
        return resolve();
      }

      const file = files.file[0] || files.file; // depends on your version
      const inputPath = file.filepath;
      const outputPath = path.join(process.cwd(), 'temp-output.pdf');

      try {
        await convertToPdf(inputPath, outputPath);

        const pdfBuffer = fs.readFileSync(outputPath);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Cover_Letter.pdf');
        res.send(pdfBuffer);
      } catch (error) {
        console.error('Conversion failed:', error);
        res.status(500).json({ error: 'PDF conversion failed.' });
      } finally {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        resolve(); // ✅ Ensure the Promise resolves
      }
    });
  });
}
