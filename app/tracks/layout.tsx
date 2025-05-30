"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/app/Sidebar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTrack } from "@/components/app/actions/CreateTrack";

export default function MusicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen bg-background grid grid-cols-1 lg:grid-cols-5">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="bg-white fixed bottom-4 right-2 z-20 lg:hidden shadow-lg rounded-full p-3"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">Menu</h2>
                    </div>
                    <Sidebar className="pb-0" />
                </SheetContent>
            </Sheet>
            <aside className="hidden lg:block lg:col-span-1 border-r">
                <Sidebar />
            </aside>
            <main className="col-span-1 lg:col-span-4 flex flex-col">
                <div className="px-4 py-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <Tabs defaultValue="music">
                            <TabsList>
                                <TabsTrigger value="music">Music</TabsTrigger>
                                <TabsTrigger value="podcasts" disabled>
                                    Podcasts
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <CreateTrack />
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
