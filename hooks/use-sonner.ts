"use client";

import { toast as sonnerToast } from "sonner";
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 10000; // 10 seconds

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastVariant = "default" | "destructive" | "success";

type ToastInput = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastAction;
  variant?: ToastVariant;
};

type ToastInstance = {
  id: string;
  dismiss: () => void;
  update: (update: ToastInput) => void;
};

let toastCount = 0;

const generateId = () => {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
};

const toastRefs = new Map<string, ToastInstance>();

const useSonner = () => {
  const toast = (props: ToastInput): ToastInstance => {
    // Enforce toast limit
    if (toastRefs.size >= TOAST_LIMIT) {
      const [firstId] = toastRefs.keys();
      toastRefs.get(firstId)?.dismiss();
    }

    const id = generateId();

    const dismiss = () => {
      sonnerToast.dismiss(id);
      toastRefs.delete(id);
    };

    const update = (newProps: ToastInput) => {
      sonnerToast.dismiss(id);
      const newId = generateId();
      showToast(newId, newProps);
    };

    const showToast = (
      id: string,
      { title, description, action, variant = "default" }: ToastInput
    ) => {
      const toastFn =
        variant === "destructive"
          ? sonnerToast.error
          : variant === "success"
          ? sonnerToast.success
          : sonnerToast;

      toastFn(title || "", {
        id,
        description,
        action,
        onAutoClose: () => toastRefs.delete(id),
      });
    };

    showToast(id, props);

    const instance = { id, dismiss, update };
    toastRefs.set(id, instance);

    setTimeout(() => {
      dismiss();
    }, TOAST_REMOVE_DELAY);

    return instance;
  };

  const dismiss = (id?: string) => {
    if (id) {
      toastRefs.get(id)?.dismiss();
    } else {
      [...toastRefs.values()].forEach((t) => t.dismiss());
    }
  };

  return { toast, dismiss };
};

export { useSonner };
