'use client';

import { CircleUserRoundIcon, XIcon, Camera } from 'lucide-react';

import { FileWithPreview, useFileUpload } from '@/hooks/use-file-upload';
import { Button } from '@/components/ui/button';
import { User } from 'better-auth';
import { uploadAvatar } from '../../actions/uploadAvatar.action';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function UserAvatarUploader(props: { user: User }) {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(uploadAvatar);
	const [clientError, setClientError] = useState<string | null>(null);

	const uploadFile = async (files: FileWithPreview[]) => {
		const file = files[0];
		if (!file) return;

		setClientError(null);
		if (file.file && file.file.size > MAX_FILE_SIZE) {
			setClientError(`Fichier trop volumineux. Taille maximale : ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
			return;
		}

		if (!ALLOWED_MIME_TYPES.includes(file.file.type)) {
			setClientError('Type de fichier non autorisé.');
			return;
		}

		if (!/^[a-zA-Z0-9._\s-]+$/.test(file.file.name)) {
			setClientError('Nom de fichier invalide.');
			return;
		}

		const formData = new FormData();
		formData.set('file', file.file as File);
		await executeAsync(formData);
	};

	const [
		{ files, isDragging },
		{ removeFile, openFileDialog, getInputProps, handleDragEnter, handleDragLeave, handleDragOver, handleDrop },
	] = useFileUpload({
		accept: 'image/*',
		initialFiles: props.user.image
			? [
					{
						name: 'profile.png',
						type: 'image/png',
						url: props.user.image ?? '',
						id: props.user.id ?? '',
						size: 128,
					},
			  ]
			: undefined,
		onFilesAdded: uploadFile,
	});

	const previewUrl = files[0]?.preview || props.user.image;

	return (
		<div className='flex flex-col'>
			<div className='relative flex flex-col items-center w-32 h-32 rounded-full border-3 border-white bg-white'>
				<div className='relative inline-flex size-full'>
					{/* Drop area */}
					<button
						className='border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-full items-center justify-center overflow-hidden rounded-full transition-colors outline-none cursor-pointer focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none group'
						onClick={openFileDialog}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						data-dragging={isDragging || undefined}
						disabled={isExecuting}
						aria-label={previewUrl ? 'Change image' : 'Upload image'}>
						{previewUrl ? (
							<img
								className='size-full object-cover'
								src={previewUrl}
								alt={files[0]?.file?.name || 'Uploaded image'}
								width={64}
								height={64}
								style={{ objectFit: 'cover' }}
							/>
						) : (
							<div aria-hidden='true'>
								<CircleUserRoundIcon
									width={128}
									height={128}
									className='opacity-60 '
								/>
							</div>
						)}
						<div className='absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10'>
							<Camera className='w-8 h-8 text-white' />
						</div>
					</button>
					{previewUrl && (
						<Button
							onClick={async () => {
								removeFile(files[0]?.id);
								setClientError(null);
								await executeAsync({});
							}}
							size='icon'
							disabled={isExecuting}
							className='border-background focus-visible:border-background z-10 absolute -top-0 right-1 size-8 rounded-full border-2 shadow-none'
							aria-label='Remove image'>
							<XIcon className='size-4.5' />
						</Button>
					)}
					<input
						{...getInputProps()}
						className='sr-only'
						aria-label='Upload image file'
						tabIndex={-1}
					/>
				</div>
			</div>
			<div className='h-6 mt-2'>
				{hasErrored && <div className='text-red-500 text-sm'>{result?.serverError}</div>}
				{clientError && <div className='text-red-500 text-sm'>{clientError}</div>}
			</div>
		</div>
	);
}
