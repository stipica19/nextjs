import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminPanel from "@/components/AdminPanel"; // ✅ Komponenta za prikaz admin panela

export default async function AdminPage() {


    return <AdminPanel />; // ✅ Ako je sve u redu, prikaži admin panel
}
