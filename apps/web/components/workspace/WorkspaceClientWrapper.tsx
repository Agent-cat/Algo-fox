"use client";

import dynamic from "next/dynamic";
import { Problem, ProblemTestCase } from '@prisma/client';

import WorkspaceSkeleton from "./WorkspaceSkeleton";

const Workspace = dynamic(() => import("./Workspace"), {
    ssr: false,
    loading: () => <WorkspaceSkeleton />
});

export default function WorkspaceClientWrapper(props: any) {
    return <Workspace {...props} />;
}
