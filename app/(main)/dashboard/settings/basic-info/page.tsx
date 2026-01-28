import { BasicInfoSettings } from "@/components/settings/BasicInfoSettings";
import { getUserSettings } from "@/actions/user.action";
import { redirect } from "next/navigation";

export default async function BasicInfoPage() {
    const user = await getUserSettings();

    if (!user) {
        redirect("/signin");
    }

    return (
        <BasicInfoSettings user={user} />
    );
}
