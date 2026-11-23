const variants = {
  primary:
    "border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark",
  secondary:
    "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  subtleDanger:
    "border-red-100 bg-brand-soft text-brand hover:border-red-200 hover:bg-red-100",
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
