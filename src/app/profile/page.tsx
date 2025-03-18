"use client"
import ProfilePage from "@/containers/profile-page";
import { DashboardLayout } from "@/components/layout";

export default function page() {
    return (
    <DashboardLayout>
        <ProfilePage />
    </DashboardLayout>
    )
}