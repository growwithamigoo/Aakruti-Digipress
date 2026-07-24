"use client";

import { useState, useActionState } from "react";
import { changePasswordAction } from "@/actions/authActions";
import { Eye, EyeOff, KeyRound, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChangePasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [state, formAction, isPending] = useActionState(changePasswordAction, null);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm font-medium text-brand-cyan hover:underline transition cursor-pointer"
      >
        Update
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-cyan/10 text-brand-cyan rounded-xl">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Change Password</h3>
                  <p className="text-xs text-gray-500">Ensure your account uses a strong password</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form action={formAction} className="p-6 space-y-4">
              {state?.success && (
                <div className="p-3.5 bg-emerald-50 text-emerald-700 text-sm rounded-xl flex items-center gap-2.5 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{state.message}</span>
                </div>
              )}

              {state?.error && (
                <div className="p-3.5 bg-rose-50 text-rose-700 text-sm rounded-xl flex items-center gap-2.5 border border-rose-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition pr-10 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    required
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition pr-10 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition pr-10 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-sm font-medium text-white bg-brand-cyan hover:bg-brand-cyan/90 rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {isPending ? "Updating..." : "Save Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
