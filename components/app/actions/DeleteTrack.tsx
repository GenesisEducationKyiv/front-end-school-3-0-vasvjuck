"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteTrack } from "@/hooks/api/useTracks";
import type { ApiError } from '@/schema';
interface DeleteTrackProps {
    trackId: string;
    trackTitle: string;
}

export const DeleteTrack = ({ trackId, trackTitle }: DeleteTrackProps) => {
    const { mutate: deleteTrack } = useDeleteTrack();

    const handleConfirm = () => {
        deleteTrack(trackId, {
            onSuccess: () => {
                toast.success("Track deleted", {
                    description: `${trackTitle} was successfully deleted.`,
                });
            },
            onError: (error: ApiError) => {
                toast.error("Deletion failed", {
                    description: error?.message || "Unable to delete track.",
                });
            },
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="icon"
                    data-testid={`delete-track-${trackId}`}
                >
                    <Trash2Icon size={16} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-testid="confirm-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete track?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete "{trackTitle}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel data-testid="cancel-delete">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        data-testid="confirm-delete"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}