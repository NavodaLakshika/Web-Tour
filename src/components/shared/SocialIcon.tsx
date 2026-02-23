import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialIconProps {
    icon: LucideIcon;
    label: string;
    color: string;
    href?: string;
    onClick?: () => void;
    tooltipPosition?: "top" | "bottom" | "left" | "right";
    className?: string; // Added className
}

export const SocialIcon: React.FC<SocialIconProps> = ({
    icon: Icon,
    label,
    color,
    href,
    onClick,
    tooltipPosition = "top",
    className // Destructure className
}) => {

    const positionClasses = {
        top: "bottom-full mb-3 left-1/2 -translate-x-1/2 group-hover:-translate-y-2",
        bottom: "top-full mt-3 left-1/2 -translate-x-1/2 group-hover:translate-y-2",
        left: "right-full mr-3 top-1/2 -translate-y-1/2 group-hover:-translate-x-2",
        right: "left-full ml-3 top-1/2 -translate-y-1/2 group-hover:translate-x-2",
    };

    const arrowStyles = {
        top: { borderTopColor: color, bottom: '-6px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${color}` },
        bottom: { borderBottomColor: color, top: '-6px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: `6px solid ${color}` },
        left: { borderLeftColor: color, right: '-6px', top: '50%', transform: 'translateY(-50%)', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: `6px solid ${color}` },
        right: { borderRightColor: color, left: '-6px', top: '50%', transform: 'translateY(-50%)', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: `6px solid ${color}` },
    };

    const InnerContent = (
        <>
            <div
                className={cn(
                    "absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none z-50 whitespace-nowrap flex items-center justify-center",
                    positionClasses[tooltipPosition]
                )}
            >
                <span
                    className="relative block px-3 py-1.5 text-xs font-bold text-white rounded-md shadow-xl"
                    style={{ backgroundColor: color }}
                >
                    {label}

                    <span
                        className="absolute w-0 h-0"
                        style={arrowStyles[tooltipPosition]}
                    />
                </span>
            </div>

            <div
                className={cn(
                    "w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg transition-all duration-300 relative overflow-hidden z-20",
                    "group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                )}
            >
                <div
                    className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center"
                    style={{ backgroundColor: color }}
                />

                <Icon className="w-5 h-5 relative z-10 transition-colors duration-300 transform group-hover:scale-110" />
            </div>
        </>
    );

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={cn("group relative flex items-center justify-center isolate focus:outline-none", className)}
                type="button"
            >
                {InnerContent}
            </button>
        );
    }

    return (
        <Link
            href={href || "#"}
            className={cn("group relative flex items-center justify-center isolate", className)}
        >
            {InnerContent}
        </Link>
    );
};
