'use client';

import { CircleUserRoundIcon, Camera, Loader2 } from 'lucide-react';

import { FileWithPreview, useFileUpload } from '@/hooks/use-file-upload';
import { User } from 'better-auth';
import { uploadAvatar } from '../../actions/uploadAvatar.action';
import { useAction } from 'next-safe-action/hooks';
import { useState, useEffect } from 'react';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/png'];

export function UserAvatarUploader(props: { user: User }) {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(uploadAvatar);
	const [clientError, setClientError] = useState<string | null>(null);
	const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(props.user.image ?? null);

	const uploadFile = async (files: FileWithPreview[]) => {
		const file = files[0];
		if (!file) return;

		setClientError(null);
		if (file.file && file.file.size > MAX_FILE_SIZE) {
			setClientError(`Fichier trop volumineux. Taille maximale : ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
			return;
		}

		if (!ALLOWED_MIME_TYPES.includes(file.file.type)) {
			setClientError('Votre image doit être au format PNG.');
			return;
		}

		if (!/^[a-zA-Z0-9._\s-]+$/.test(file.file.name)) {
			setClientError('Nom de fichier invalide.');
			return;
		}

		const formData = new FormData();
		formData.set('file', file.file as File);
		const response = await executeAsync(formData);

		// Mettre à jour l'URL locale si l'upload réussit
		if (response?.data?.url) {
			setCurrentImageUrl(response.data.url);
		}
	};

	const [
		{ files, isDragging },
		{ openFileDialog, getInputProps, handleDragEnter, handleDragLeave, handleDragOver, handleDrop },
	] = useFileUpload({
		accept: 'image/*',
		initialFiles: currentImageUrl
			? [
					{
						name: 'profile.png',
						type: 'image/png',
						url: currentImageUrl,
						id: props.user.id ?? '',
						size: 128,
					},
			  ]
			: undefined,
		onFilesAdded: uploadFile,
	});

	const previewUrl = files[0]?.preview || currentImageUrl;

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

						<div
							className={`absolute inset-0 bg-black/30 rounded-full transition-opacity duration-200 flex items-center justify-center z-10 ${
								isExecuting ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
							}`}>
							{isExecuting ? (
								<Loader2 className='w-8 h-8 text-white animate-spin' />
							) : (
								<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
									<Camera className='w-8 h-8 text-white' />
								</div>
							)}
						</div>
					</button>
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
