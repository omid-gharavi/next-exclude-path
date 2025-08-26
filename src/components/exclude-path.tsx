"use client";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type Props = {
    childProp: ReactElement;
    excludePath: string[];
};

export default function ExcludePath({ childProp, excludePath }: Props) {
    const path: string = usePathname();

    return <>{excludePath.includes(path) ? null : childProp}</>;
}