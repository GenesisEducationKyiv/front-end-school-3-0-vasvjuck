"use client";

import { useState, lazy, Suspense } from "react";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateTrack } from "@/hooks/api/useTracks";
import type { TrackInput } from '@/schema'

const Form = lazy(() => import("@/components/app/Form").then(mod => ({ default: mod.Form })));

export const CreateTrack = () => {
    const [open, setOpen] = useState(false);

    const createTrack = useCreateTrack();

    const onSubmit = async (values: TrackInput) => {
        try {
            await createTrack.mutateAsync(values);
            toast.success("New track added", {
                description: `"${values.title}" by ${values.artist} has been created.`,
            });
            setOpen(false);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "There was a problem creating your track.";
            toast.error("Error creating track", {
                description: message,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button data-testid="create-track-button">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Track
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add a new track</DialogTitle>
                    <DialogDescription>
                        Enter metadata for your new track.
                    </DialogDescription>
                </DialogHeader>
                <Suspense fallback={<div className="space-y-4">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>}>
                    <Form onSubmit={onSubmit} />
                </Suspense>
            </DialogContent>
        </Dialog >
    );
};
