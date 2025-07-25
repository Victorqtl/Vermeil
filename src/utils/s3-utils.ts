import { PutObjectCommand, S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

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
	const filePath = `${path}/default.${fileExtension}`;

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

export async function cleanupOldAvatars(userId: string) {
	const s3Client = getS3Client();

	if (!process.env.AWS_BUCKET_NAME || !process.env.AWS_REGION) {
		throw new Error('Configuration AWS manquante');
	}

	const avatarPrefix = `users/${userId}/avatar/`;

	try {
		const listCommand = new ListObjectsV2Command({
			Bucket: process.env.AWS_BUCKET_NAME,
			Prefix: avatarPrefix,
		});

		const response = await s3Client.send(listCommand);

		if (response.Contents && response.Contents.length > 0) {
			for (const object of response.Contents) {
				if (object.Key && object.Key !== `users/${userId}/avatar/default.jpg` && 
					object.Key !== `users/${userId}/avatar/default.png` && 
					object.Key !== `users/${userId}/avatar/default.jpeg`) {
					
					const deleteCommand = new DeleteObjectCommand({
						Bucket: process.env.AWS_BUCKET_NAME,
						Key: object.Key,
					});

					await s3Client.send(deleteCommand);
					console.log(`Fichier supprimé: ${object.Key}`);
				}
			}
		}
	} catch (error) {
		console.error('Erreur lors du nettoyage des anciens avatars:', error);
	}
}
