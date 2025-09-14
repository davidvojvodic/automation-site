import React from "react";
import { 
  Users, 
  FileText, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Zap,
  UserCheck
} from "lucide-react";

export const ClientManagementVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-n-8 via-n-8 to-color-1/10 rounded-3xl" />
      
      {/* Main workflow container */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h5 className="text-color-1 font-semibold text-sm uppercase tracking-wider mb-2">
            Automated Workflow
          </h5>
          <p className="text-n-3 text-sm">Transform chaos into organized efficiency</p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Step 1: Intake */}
          <div className="relative">
            <div className="bg-n-7 border border-n-6 rounded-2xl p-6 hover:border-color-1/50 transition-all">
              <div className="w-14 h-14 bg-color-1/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-color-1" />
              </div>
              <h6 className="font-semibold text-n-1 mb-2">Smart Intake</h6>
              <p className="text-n-4 text-sm mb-4">Automated forms capture client data instantly</p>
              
              {/* Mini icons showing inputs */}
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-n-6 rounded flex items-center justify-center">
                  <Mail className="w-4 h-4 text-n-3" />
                </div>
                <div className="w-8 h-8 bg-n-6 rounded flex items-center justify-center">
                  <Users className="w-4 h-4 text-n-3" />
                </div>
                <div className="w-8 h-8 bg-n-6 rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-n-3" />
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
              <ArrowRight className="w-8 h-8 text-color-1" />
            </div>
          </div>

          {/* Step 2: Process */}
          <div className="relative">
            <div className="bg-n-7 border border-color-1/30 rounded-2xl p-6 transform md:scale-110 shadow-xl">
              <div className="w-14 h-14 bg-color-1/20 rounded-xl flex items-center justify-center mb-4 relative">
                <Zap className="w-7 h-7 text-color-1" />
                {/* Animated pulse */}
                <div className="absolute inset-0 bg-color-1/20 rounded-xl animate-pulse" />
              </div>
              <h6 className="font-semibold text-n-1 mb-2">AI Processing</h6>
              <p className="text-n-4 text-sm mb-4">Instant qualification & smart routing</p>
              
              {/* Processing indicators */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-color-1 rounded-full animate-pulse" />
                  <span className="text-xs text-n-3">Lead scoring: 85%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-color-1 rounded-full animate-pulse" />
                  <span className="text-xs text-n-3">Auto-assigned to: Sales Team</span>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
              <ArrowRight className="w-8 h-8 text-color-1" />
            </div>
          </div>

          {/* Step 3: Result */}
          <div className="relative">
            <div className="bg-n-7 border border-n-6 rounded-2xl p-6 hover:border-color-1/50 transition-all">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <UserCheck className="w-7 h-7 text-green-500" />
              </div>
              <h6 className="font-semibold text-n-1 mb-2">Client Onboarded</h6>
              <p className="text-n-4 text-sm mb-4">Welcome sequence triggered automatically</p>
              
              {/* Results */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-color-1" />
                  <span className="text-xs text-n-3">70% faster</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-color-1">3min</p>
            <p className="text-xs text-n-4">Avg. processing time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-color-1">98%</p>
            <p className="text-xs text-n-4">Client satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-color-1">0</p>
            <p className="text-xs text-n-4">Manual tasks</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-color-1/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-color-1/5 rounded-full blur-2xl" />
    </div>
  );
};

export const ClientManagementMobile = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-n-8 to-color-1/10 rounded-2xl" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Central icon */}
        <div className="w-20 h-20 bg-color-1/20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
          <Zap className="w-10 h-10 text-color-1" />
          <div className="absolute inset-0 bg-color-1/20 rounded-2xl animate-pulse" />
        </div>
        
        {/* Title */}
        <h5 className="text-xl font-semibold text-n-1 mb-4">
          Client Automation Active
        </h5>
        
        {/* Workflow indicators */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="w-12 h-12 bg-n-7 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-color-1" />
          </div>
          <ArrowRight className="w-4 h-4 text-n-4" />
          <div className="w-12 h-12 bg-n-7 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-color-1" />
          </div>
          <ArrowRight className="w-4 h-4 text-n-4" />
          <div className="w-12 h-12 bg-n-7 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-n-7/50 rounded-xl p-3">
            <p className="text-xl font-bold text-color-1">15hrs</p>
            <p className="text-xs text-n-4">Saved weekly</p>
          </div>
          <div className="bg-n-7/50 rounded-xl p-3">
            <p className="text-xl font-bold text-color-1">70%</p>
            <p className="text-xs text-n-4">Faster onboarding</p>
          </div>
        </div>
      </div>
    </div>
  );
};