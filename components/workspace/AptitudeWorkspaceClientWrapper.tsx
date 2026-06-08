"use client";

import dynamic from "next/dynamic";

import WorkspaceSkeleton from "./WorkspaceSkeleton";

const AptitudeWorkspace = dynamic(() => import("./AptitudeWorkspace"), {
    ssr: false,
    loading: () => <WorkspaceSkeleton />
});

export default function AptitudeWorkspaceClientWrapper(props: any) {
    return <AptitudeWorkspace {...props} />;
}
