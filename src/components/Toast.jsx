/* eslint-disable react-refresh/only-export-components -- notify() helpers live beside the toast card on purpose */
import { toast } from "sonner";
import { FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

/* Custom toast card rendered through Sonner (Sonner only handles stacking + animation). */
const TONES = {
  loading: { color: "#ffab1a", label: "sending" },
  success: { color: "#34d399", label: "delivered" },
  error: { color: "#ff5533", label: "failed" },
};

const ToastCard = ({ id, type, title, description, action, duration }) => {
  const tone = TONES[type];
  return (
    <div className="toast-card" style={{ "--tone": tone.color }} role={type === "error" ? "alert" : "status"}>
      <div className="toast-icon">
        {type === "loading" && <span className="toast-spinner" />}
        {type === "success" && <FiCheck />}
        {type === "error" && <FiAlertTriangle />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="toast-label">{"// "}{tone.label}</p>
        <p className="toast-title">{title}</p>
        {description && <p className="toast-desc">{description}</p>}
        {action && (
          <button
            type="button"
            className="toast-action"
            onClick={() => {
              action.onClick();
              toast.dismiss(id);
            }}
          >
            {action.label} →
          </button>
        )}
      </div>

      <button type="button" className="toast-close" aria-label="Dismiss" onClick={() => toast.dismiss(id)}>
        <FiX />
      </button>

      {Number.isFinite(duration) && (
        <span className="toast-progress" style={{ animationDuration: `${duration}ms` }} />
      )}
    </div>
  );
};

const show = (type, title, opts = {}) => {
  const duration = opts.duration ?? (type === "loading" ? Infinity : 5000);
  return toast.custom(
    (id) => <ToastCard id={id} type={type} title={title} duration={duration} {...opts} />,
    { id: opts.id, duration }
  );
};

export const notify = {
  loading: (title, opts) => show("loading", title, opts),
  success: (title, opts) => show("success", title, opts),
  error: (title, opts) => show("error", title, opts),
};
