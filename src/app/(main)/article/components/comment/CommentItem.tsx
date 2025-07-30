'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X } from 'lucide-react';
import Image from 'next/image';

interface CommentItemProps {
	comment: {
		id: string;
		text: string;
		createdAt: Date | string;
		updatedAt: Date | string;
		user: {
			id: string;
			name: string;
			image?: string | null;
		};
	};
	currentUser?: {
		id: string;
	} | null;
	onUpdateComment: (commentId: string, text: string) => void;
	onDeleteComment: (commentId: string) => void;
}

export default function CommentItem({ comment, currentUser, onUpdateComment, onDeleteComment }: CommentItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(comment.text);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleUpdate = async () => {
		if (!editText.trim()) return;
		setIsUpdating(true);
		try {
			onUpdateComment(comment.id, editText.trim());
			setIsEditing(false);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			onDeleteComment(comment.id);
		} finally {
			setIsDeleting(false);
		}
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditText(comment.text);
	};

	const isOwner = currentUser?.id === comment.user.id;
	const wasEdited = new Date(comment.updatedAt).getTime() !== new Date(comment.createdAt).getTime();

	return (
		<div className='bg-white p-6 border border-gray-200'>
			<div className='flex items-start justify-between mb-4'>
				<div className='flex items-center'>
					<div className='w-10 h-10 rounded-full overflow-hidden mr-3'>
						{comment.user.image ? (
							<Image
								src={comment.user.image}
								alt={comment.user.name}
								width={40}
								height={40}
								className='object-cover w-full h-full'
							/>
						) : (
							<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
								<span className='text-gray-600 text-sm font-medium'>
									{comment.user.name.charAt(0).toUpperCase()}
								</span>
							</div>
						)}
					</div>
					<div>
						<h4 className='font-semibold text-gray-900'>{comment.user.name}</h4>
						<p className='text-sm text-gray-500'>
							{new Date(comment.createdAt).toLocaleDateString('fr-FR', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
							})}
							{wasEdited && <span className='ml-2 text-xs text-gray-400'>(modifié)</span>}
						</p>
					</div>
				</div>

				{isOwner && !isEditing && !showDeleteConfirm && (
					<div className='flex items-center space-x-2'>
						<Button
							variant='outlined'
							size='icon'
							onClick={() => {
								setIsEditing(true);
							}}
							className='p-2'>
							<Edit size={16} />
						</Button>
						<Button
							variant='outlined'
							size='icon'
							onClick={() => {
								setShowDeleteConfirm(true);
							}}
							className='p-2 text-gray-900 border-gray-300'>
							<Trash2 size={16} />
						</Button>
					</div>
				)}
			</div>

			{isEditing ? (
				<div className='space-y-4'>
					<textarea
						value={editText}
						onChange={e => setEditText(e.target.value)}
						className='w-full min-h-[100px] p-3 border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
						maxLength={1000}
						disabled={isUpdating}
					/>
					<p className='text-xs text-gray-500'>{editText.length}/1000 caractères</p>
					<div className='flex items-center space-x-2'>
						<Button
							onClick={handleUpdate}
							disabled={!editText.trim() || isUpdating}
							size='default'
							className='flex items-center'>
							<Check
								size={16}
								className='mr-2'
							/>
							{isUpdating ? 'Modification...' : 'Sauvegarder'}
						</Button>
						<Button
							variant='outlined'
							onClick={handleCancelEdit}
							disabled={isUpdating}
							size='default'
							className='flex items-center'>
							<X
								size={16}
								className='mr-2'
							/>
							Annuler
						</Button>
					</div>
				</div>
			) : (
				<div className='text-gray-900 leading-relaxed whitespace-pre-wrap'>{comment.text}</div>
			)}

			{showDeleteConfirm && (
				<div className='mt-4 p-4 bg-gray-50 border border-gray-200'>
					<p className='text-gray-900 mb-3'>Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
					<div className='flex items-center space-x-2'>
						<Button
							onClick={handleDelete}
							disabled={isDeleting}
							className='bg-gray-900 hover:bg-gray-700 text-white'>
							{isDeleting ? 'Suppression...' : 'Supprimer'}
						</Button>
						<Button
							variant='outlined'
							onClick={() => setShowDeleteConfirm(false)}
							disabled={isDeleting}>
							Annuler
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}