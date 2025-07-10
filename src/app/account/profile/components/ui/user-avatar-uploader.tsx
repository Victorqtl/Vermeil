'use client';

import { CircleUserRoundIcon, Camera, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { FileWithPreview, useFileUpload } from '@/hooks/use-file-upload';
import { User } from 'better-auth';
import { uploadAvatar } from '../../actions/uploadAvatar.action';
import { useAction } from 'next-safe-action/hooks';
import { useState, useCallback, useTransition } from 'react';
import Image from 'next/image';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export function UserAvatarUploader(props: { user: User }) {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(uploadAvatar);
	const [clientError, setClientError] = useState<string | null>(null);
	const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(props.user.image ?? null);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [isPending, startTransition] = useTransition();

	// Optimisation : utiliser useCallback pour éviter les re-renders inutiles
	const uploadFile = useCallback(
		async (files: FileWithPreview[]) => {
			const file = files[0];
			if (!file) return;

			setClientError(null);
			setUploadSuccess(false);

			// Validation côté client optimisée
			if (file.file && file.file.size > MAX_FILE_SIZE) {
				setClientError(`Fichier trop volumineux. Taille maximale : ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
				return;
			}

			if (!ALLOWED_MIME_TYPES.includes(file.file.type)) {
				setClientError('Votre image doit être au format PNG, JPEG ou JPG.');
				return;
			}

			if (!/^[a-zA-Z0-9._\s-]+$/.test(file.file.name)) {
				setClientError(
					'Nom de fichier invalide. Utilisez seulement des lettres, chiffres, points, tirets et espaces.'
				);
				return;
			}

			// Utilisation de startTransition pour une meilleure UX
			startTransition(async () => {
				try {
					const formData = new FormData();
					formData.set('file', file.file as File);

					const response = await executeAsync(formData);

					if (response?.data?.url) {
						setCurrentImageUrl(response.data.url);
						setUploadSuccess(true);
						// Cacher le message de succès après 3 secondes
						setTimeout(() => setUploadSuccess(false), 3000);
					}
				} catch (error) {
					console.error("Erreur lors de l'upload:", error);
					setClientError("Erreur lors de l'upload. Veuillez réessayer.");
				}
			});
		},
		[executeAsync]
	);

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
	const isLoading = isExecuting || isPending;

	return (
		<div className='flex flex-col'>
			<div className='relative flex flex-col items-center w-32 h-32 rounded-full border-3 border-white bg-white shadow-lg'>
				<div className='relative inline-flex size-full'>
					{/* Drop area */}
					<button
						className='border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-full items-center justify-center overflow-hidden rounded-full transition-all duration-200 outline-none cursor-pointer focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none group disabled:cursor-not-allowed disabled:opacity-70'
						onClick={openFileDialog}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						data-dragging={isDragging || undefined}
						disabled={isLoading}
						aria-label={previewUrl ? "Changer l'image" : 'Télécharger une image'}
						title={previewUrl ? "Cliquer pour changer l'image" : 'Cliquer pour télécharger une image'}>
						{previewUrl ? (
							<Image
								className='size-full object-cover transition-opacity duration-200 group-hover:opacity-90'
								src={previewUrl}
								alt={files[0]?.file?.name || 'Avatar utilisateur'}
								width={128}
								height={128}
								priority
								quality={85}
								sizes='128px'
							/>
						) : (
							<div
								aria-hidden='true'
								className='transition-opacity duration-200 group-hover:opacity-80'>
								<CircleUserRoundIcon
									width={128}
									height={128}
									className='opacity-60'
								/>
							</div>
						)}

						{/* Overlay avec transitions améliorées */}
						<div
							className={`absolute inset-0 bg-black/30 rounded-full transition-all duration-200 flex items-center justify-center z-10 ${
								isLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
							}`}>
							{isLoading ? (
								<Loader2 className='w-8 h-8 text-white animate-spin' />
							) : (
								<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
									<Camera className='w-8 h-8 text-white' />
								</div>
							)}
						</div>

						{/* Indicateur de succès */}
						{uploadSuccess && (
							<div className='absolute -top-2 -right-2 bg-green-500 rounded-full p-1 animate-pulse'>
								<CheckCircle className='w-4 h-4 text-white' />
							</div>
						)}
					</button>
					<input
						{...getInputProps()}
						className='sr-only'
						aria-label='Télécharger un fichier image'
						tabIndex={-1}
					/>
				</div>
			</div>

			{/* Messages d'erreur et de succès avec animations */}
			<div className='min-h-[1.5rem] mt-2 px-2'>
				{hasErrored && (
					<div className='flex items-center gap-1 text-red-500 text-sm animate-in slide-in-from-top-2 duration-300'>
						<AlertCircle className='w-4 h-4 flex-shrink-0' />
						<span>{result?.serverError}</span>
					</div>
				)}
				{clientError && (
					<div className='flex items-center gap-1 text-red-500 text-sm animate-in slide-in-from-top-2 duration-300'>
						<AlertCircle className='w-4 h-4 flex-shrink-0' />
						<span>{clientError}</span>
					</div>
				)}
				{uploadSuccess && (
					<div className='flex items-center gap-1 text-green-600 text-sm animate-in slide-in-from-top-2 duration-300'>
						<CheckCircle className='w-4 h-4 flex-shrink-0' />
						<span>Avatar mis à jour avec succès !</span>
					</div>
				)}
			</div>
		</div>
	);
}
