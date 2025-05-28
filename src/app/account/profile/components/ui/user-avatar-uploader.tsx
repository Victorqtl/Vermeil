'use client';

import { CircleUserRoundIcon, XIcon } from 'lucide-react';

import { FileWithPreview, useFileUpload } from '@/hooks/use-file-upload';
import { Button } from '@/components/ui/button';
import { User } from 'better-auth';
import { uploadAvatar } from '../../actions/uploadAvatar.action';

export function UserAvatarUploader(props: { user: User }) {
	const uploadFile = (files: FileWithPreview[]) => {
		const file = files[0];
		if (!file) return;
		const formData = new FormData();
		formData.set('file', file.file as File);
		uploadAvatar(formData);
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
						size: 100,
					},
			  ]
			: undefined,
		onFilesAdded: uploadFile,
	});

	const previewUrl = files[0]?.preview || null;

	return (
		<div className='flex flex-col items-center w-32 h-32 rounded-full border-3 border-white bg-white'>
			<div className='relative inline-flex size-full'>
				{/* Drop area */}
				<button
					className='border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-full items-center justify-center overflow-hidden rounded-full transition-colors outline-none cursor-pointer focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none'
					onClick={openFileDialog}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					data-dragging={isDragging || undefined}
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
								className='opacity-60 size-full'
							/>
						</div>
					)}
				</button>
				{previewUrl && (
					<Button
						onClick={() => {
							removeFile(files[0]?.id);
							uploadAvatar({});
						}}
						size='icon'
						className='border-background focus-visible:border-background absolute -top-0 right-1 size-8 rounded-full border-2 shadow-none'
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
	);
}
