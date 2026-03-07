"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Maximize2, Terminal as TerminalIcon, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Phase = "reasoning" | "review" | "deployed";

// --- TERMINAL OUTER SHELL ---
const TerminalHeader = () => (
    <div className="flex items-center px-4 py-3 bg-[#1e1e1e]/80 border-b border-white/5 backdrop-blur-xl shrink-0 z-10 relative shadow-sm">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto flex items-center gap-2 relative -left-4">
            <TerminalIcon className="w-3.5 h-3.5 text-n-4" />
            <span className="text-n-4 text-xs font-mono">flowko-agent ~ node</span>
        </div>
        <Maximize2 className="w-3.5 h-3.5 text-n-4" />
    </div>
);

// --- ANIMATED EQUALIZER ---
const Equalizer = () => {
    return (
        <div className="flex items-center gap-1 h-4">
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-color-1 rounded-full"
                    animate={{
                        height: ["40%", "100%", "30%", "80%", "40%"]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                    }}
                />
            ))}
        </div>
    );
};

// --- PHASE 1 COMPONENTS (Exact HTML text/SVGs, adapted for dark theme) ---

const ReasoningItem = ({
    label,
    status,
    isVisible
}: {
    label: string,
    status: "pending" | "running" | "complete",
    isVisible: boolean
}) => {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
            layout
        >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {status === "complete" ? (
                    <div className="w-5 h-5 bg-emerald-500 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="square"></path>
                        </svg>
                    </div>
                ) : status === "running" ? (
                    <motion.div
                        className="w-5 h-5 border-2 border-color-1 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    >
                        <motion.div
                            className="w-2 h-2 bg-color-1"
                            animate={{ scale: [0.8, 1.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        />
                    </motion.div>
                ) : (
                    <div className="w-5 h-5 border border-white/20" />
                )}
            </div>
            <span className={cn(
                "text-sm font-medium transition-colors duration-500",
                status === "pending" ? "text-n-4" : status === "running" ? "text-white" : "text-n-2"
            )}>
                {label}
            </span>
        </motion.div>
    );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const ReasoningTerminal = () => {
    const t = useTranslations("HomePage.terminal");
    const [phase, setPhase] = useState<Phase>("reasoning");

    const [reasoningStep, setReasoningStep] = useState(-1);
    const [reviewStep, setReviewStep] = useState(-1);
    const [deployedStep, setDeployedStep] = useState(-1);

    const [actionsProcessed, setActionsProcessed] = useState(248);

    useEffect(() => {
        let isMounted = true;
        let mainPhaseTimeout: NodeJS.Timeout;
        let stepInterval: NodeJS.Timeout;
        let metricsInterval: NodeJS.Timeout;

        const runSequence = () => {
            if (!isMounted) return;

            setPhase("reasoning");
            setReasoningStep(-1);
            setReviewStep(-1);
            setDeployedStep(-1);

            // Phase 1 Timing
            setTimeout(() => {
                if (!isMounted) return;
                setReasoningStep(0);

                let currentStep = 0;
                stepInterval = setInterval(() => {
                    currentStep++;
                    if (currentStep <= 6) {
                        setReasoningStep(currentStep);
                    } else {
                        clearInterval(stepInterval);

                        mainPhaseTimeout = setTimeout(() => {
                            if (!isMounted) return;
                            setPhase("review");

                            // Phase 2 Timing
                            setTimeout(() => {
                                if (!isMounted) return;
                                setReviewStep(0);

                                let rwStep = 0;
                                stepInterval = setInterval(() => {
                                    rwStep++;
                                    if (rwStep <= 3) {
                                        setReviewStep(rwStep);
                                    } else {
                                        clearInterval(stepInterval);

                                        mainPhaseTimeout = setTimeout(() => {
                                            if (!isMounted) return;
                                            setPhase("deployed");

                                            // Phase 3 Timing
                                            setTimeout(() => {
                                                if (!isMounted) return;
                                                setDeployedStep(0);

                                                let depStep = 0;
                                                stepInterval = setInterval(() => {
                                                    depStep++;
                                                    if (depStep <= 3) {
                                                        setDeployedStep(depStep);
                                                    } else {
                                                        clearInterval(stepInterval);

                                                        mainPhaseTimeout = setTimeout(() => {
                                                            if (!isMounted) return;
                                                            runSequence();
                                                        }, 5000);
                                                    }
                                                }, 1200);
                                            }, 400);

                                        }, 2500);
                                    }
                                }, 1200);
                            }, 400);
                        }, 2500);
                    }
                }, 1000); // Wait 1s between steps
            }, 600);
        };

        runSequence();

        metricsInterval = setInterval(() => {
            setActionsProcessed(prev => prev + Math.floor(Math.random() * 3) + 1);
        }, 800);

        return () => {
            isMounted = false;
            clearTimeout(mainPhaseTimeout);
            clearInterval(stepInterval);
            clearInterval(metricsInterval);
        };
    }, []);

    // Progress percentage for reasoning phase
    const progressPercent = Math.min(100, Math.round((Math.max(0, reasoningStep) / 6) * 100));

    return (
        <div className="w-full max-w-[540px] mx-auto relative px-4 md:px-0">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-color-1/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />

            <motion.div
                layout
                className="relative w-full bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
                <TerminalHeader />

                <div className="relative overflow-hidden bg-[#0A0A0F] min-h-[380px]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />

                    <AnimatePresence mode="wait">
                        {/* -------------------- PHASE 1 -------------------- */}
                        {phase === "reasoning" && (
                            <motion.div
                                key="phase-1"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="p-6 md:p-8 relative"
                            >
                                <motion.div layout className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 bg-color-1 flex items-center justify-center shrink-0">
                                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                                <circle cx="4" cy="4" r="2" fill="white" />
                                                <circle cx="12" cy="4" r="2" fill="white" />
                                                <circle cx="4" cy="12" r="2" fill="white" />
                                                <circle cx="12" cy="12" r="2" fill="white" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-white">{t("phase1.title")}</span>
                                    </div>
                                    <Equalizer />
                                </motion.div>

                                <motion.div layout className="bg-white/5 border border-white/10 shadow-sm overflow-hidden">
                                    <div className="p-5">
                                        <motion.div layout className="space-y-3">
                                            <AnimatePresence>
                                                <ReasoningItem
                                                    key="reasoning-0"
                                                    label={t("phase1.step0")}
                                                    status={reasoningStep > 0 ? "complete" : reasoningStep === 0 ? "running" : "pending"}
                                                    isVisible={reasoningStep >= 0}
                                                />
                                                <ReasoningItem
                                                    key="reasoning-1"
                                                    label={t("phase1.step1")}
                                                    status={reasoningStep > 1 ? "complete" : reasoningStep === 1 ? "running" : "pending"}
                                                    isVisible={reasoningStep > 0}
                                                />
                                                <ReasoningItem
                                                    key="reasoning-2"
                                                    label={t("phase1.step2")}
                                                    status={reasoningStep > 2 ? "complete" : reasoningStep === 2 ? "running" : "pending"}
                                                    isVisible={reasoningStep > 1}
                                                />
                                                <ReasoningItem
                                                    key="reasoning-3"
                                                    label={t("phase1.step3")}
                                                    status={reasoningStep > 3 ? "complete" : reasoningStep === 3 ? "running" : "pending"}
                                                    isVisible={reasoningStep > 2}
                                                />
                                                <ReasoningItem
                                                    key="reasoning-4"
                                                    label={t("phase1.step4")}
                                                    status={reasoningStep > 4 ? "complete" : reasoningStep === 4 ? "running" : "pending"}
                                                    isVisible={reasoningStep > 3}
                                                />
                                                <ReasoningItem
                                                    key="reasoning-5"
                                                    label={t("phase1.step5")}
                                                    status={reasoningStep > 5 ? "complete" : reasoningStep === 5 ? "running" : "pending"}
                                                    isVisible={reasoningStep > 4}
                                                />
                                            </AnimatePresence>
                                        </motion.div>

                                        <motion.div layout className="mt-5 pt-4 border-t border-white/10">
                                            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-n-4 mb-2">
                                                <span>{t("phase1.progress")}</span>
                                                <span className="text-white">{progressPercent}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 overflow-hidden relative">
                                                <motion.div
                                                    className="absolute inset-y-0 left-0 bg-color-1"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: `${progressPercent}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-n-4 mt-2 italic">
                                                {reasoningStep >= 6 ? t("phase1.statusVerified") : t("phase1.statusExpanding")}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}


                        {/* -------------------- PHASE 2 -------------------- */}
                        {phase === "review" && (
                            <motion.div
                                key="phase-2"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="p-6 md:p-8 relative min-h-[380px] flex flex-col justify-center"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 bg-color-1 flex items-center justify-center shrink-0 rounded">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="text-white font-medium text-lg tracking-wide">{t("phase2.title")}</h3>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <AnimatePresence>
                                        <ReasoningItem
                                            key="review-0"
                                            label={t("phase2.step0")}
                                            status={reviewStep > 0 ? "complete" : reviewStep === 0 ? "running" : "pending"}
                                            isVisible={reviewStep >= 0}
                                        />
                                        <ReasoningItem
                                            key="review-1"
                                            label={t("phase2.step1")}
                                            status={reviewStep > 1 ? "complete" : reviewStep === 1 ? "running" : "pending"}
                                            isVisible={reviewStep > 0}
                                        />
                                        <ReasoningItem
                                            key="review-2"
                                            label={t("phase2.step2")}
                                            status={reviewStep > 2 ? "complete" : reviewStep === 2 ? "running" : "pending"}
                                            isVisible={reviewStep > 1}
                                        />
                                    </AnimatePresence>
                                </div>

                                <div className="pt-6 border-t border-white/10 mt-auto">
                                    <div className="text-[10px] text-n-4 uppercase tracking-[0.2em] mb-1.5 font-medium">{t("phase2.confidence")}</div>
                                    <div className="text-emerald-400 font-medium text-sm tracking-wide">
                                        {reviewStep >= 3 ? t("phase2.statusExceeds") : t("phase2.statusEvaluating")}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* -------------------- PHASE 3 -------------------- */}
                        {phase === "deployed" && (
                            <motion.div
                                key="phase-3"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="p-6 md:p-8 relative min-h-[380px] flex flex-col justify-center"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-color-1 flex items-center justify-center shrink-0 rounded">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-white font-medium text-lg tracking-wide">{t("phase3.title")}</h3>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <AnimatePresence>
                                        <ReasoningItem
                                            key="deployed-0"
                                            label={t("phase3.step0")}
                                            status={deployedStep > 0 ? "complete" : deployedStep === 0 ? "running" : "pending"}
                                            isVisible={deployedStep >= 0}
                                        />
                                        <ReasoningItem
                                            key="deployed-1"
                                            label={t("phase3.step1")}
                                            status={deployedStep > 1 ? "complete" : deployedStep === 1 ? "running" : "pending"}
                                            isVisible={deployedStep > 0}
                                        />
                                        <ReasoningItem
                                            key="deployed-2"
                                            label={t("phase3.step2")}
                                            status={deployedStep > 2 ? "complete" : deployedStep === 2 ? "running" : "pending"}
                                            isVisible={deployedStep > 1}
                                        />
                                    </AnimatePresence>
                                </div>

                                <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 mt-auto">
                                    <div>
                                        <div className="text-[10px] text-n-4 uppercase tracking-[0.2em] mb-1.5 font-medium">{t("phase3.queued")}</div>
                                        <div className="text-xl font-medium text-white tabular-nums tracking-tight leading-none">
                                            {actionsProcessed.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-n-4 uppercase tracking-[0.2em] mb-1.5 font-medium">{t("phase3.status")}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-emerald-500 font-medium text-sm tracking-wide">{t("phase3.statusLive")}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};
