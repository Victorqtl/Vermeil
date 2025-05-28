import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

function getS3Client() {
	return new S3Client({
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		},
	});
}

export async function uploadFileToS3({ file, path, contentType }: { file: File; path: string; contentType: string }) {
	const s3Client = getS3Client();

	if (!process.env.AWS_BUCKET_NAME || !process.env.AWS_REGION) {
		throw new Error('Configuration AWS manquante');
	}

	const fileBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(fileBuffer);

	const fileExtension = file.name.split('.').pop()?.toLowerCase();
	const uniqueFileName = `${randomUUID()}.${fileExtension}`;
	const filePath = `${path}/${uniqueFileName}`;

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: filePath,
		Body: buffer,
		ContentType: contentType || file.type,
		Metadata: {
			'uploaded-at': new Date().toISOString(),
			'original-name': file.name.replace(/[^a-zA-Z0-9._-]/g, '_'),
		},
		ContentDisposition: 'inline',
	});

	try {
		await s3Client.send(command);
	} catch (error) {
		console.error('S3 upload error', error);
		throw new Error("Échec de l'upload vers S3");
	}

	return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${filePath}`;
}
