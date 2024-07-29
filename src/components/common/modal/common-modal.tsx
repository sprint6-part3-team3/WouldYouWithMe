"use client";

import clsx from "clsx";
import React, { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import { IconAlert, IconX } from "@/public/assets/icons";

export interface ModalProps {
  /**
   * 모달의 열림/닫힘 상태를 제어합니다.
   */
  isOpen: boolean;

  /**
   * 모달이 닫힐 때 호출되는 함수입니다.
   */
  onClose: () => void;

  /**
   * 모달의 제목을 설정합니다.
   */
  title: string;

  /**
   * 모달의 설명 텍스트를 설정합니다.
   */
  description?: string;

  /**
   * 모달 닫기 버튼의 표시 여부를 설정합니다. 기본설정은 `false`입니다.
   */
  showCloseButton?: boolean;

  /**
   * 경고 아이콘의 표시 여부를 설정합니다. 기본설정은 `false`입니다.
   */
  showWarningIcon?: boolean;

  /**
   * 모달에 추가적인 CSS 클래스를 적용합니다.
   */
  className?: string;

  /**
   * 모달 내부에 표시될 자식 컴포넌트들입니다.
   */
  children?: ReactNode;
}

/**
 * 모달 컴포넌트입니다.
 * 페이지 위에 오버레이와 함께 내용을 표시합니다.
 * `isOpen`,
  `onClose`,
  `title`,
  `description`,
  `showCloseButton` = `false`,
  `showWarningIcon` = `false`,
  `className`,
  `children`,
  속성이 있습니다.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  showCloseButton = false,
  showWarningIcon = false,
  className,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const titleMarginClass = description ? "mb-8" : "mb-24";

  return createPortal(
    <div
      ref={modalRef}
      onClick={(e) => e.target === modalRef.current && onClose()}
      className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-y-auto bg-background-primary/50"
    >
      <div
        className={clsx(
          "z-51 relative w-384 rounded-8 bg-background-secondary px-48 pb-32 pt-48 shadow-lg",
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-12 top-12 text-text-secondary hover:text-text-primary"
          >
            <IconX width={20} height={20} />
          </button>
        )}

        <div className="flex flex-col items-center">
          {showWarningIcon && (
            <div className="mb-16">
              <IconAlert width={24} height={24} />
            </div>
          )}

          {title && (
            <h2
              className={clsx(
                "font-pretendard leading-19 text-center text-16 font-medium text-text-primary",
                titleMarginClass,
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="font-pretendard leading-17 mb-24 text-center text-14 font-medium text-text-secondary">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
