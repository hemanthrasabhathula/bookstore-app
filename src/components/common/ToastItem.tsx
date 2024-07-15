import { Toast, ToastContainer } from "react-bootstrap";

const ToastItem = ({
  showToast,
  heading,
  message,
  toggleToast,
  variant,
}: {
  showToast: boolean;
  heading: string;
  message: string;
  toggleToast: () => void;
  variant?: string;
}) => {
  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      <Toast
        bg={variant || "success"}
        onClose={toggleToast}
        show={showToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{heading}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastItem;
